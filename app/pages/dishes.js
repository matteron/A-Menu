module.exports = class Dishes {
	constructor(db, lang) {
		this.dishes = '';
		this.categories = '';
		this.editing = false;
	}

	html() {
		return `
			<div class="container-fluid row" id="categories">
				<div class="column card cardShadow" style="width: 22rem; max-height: 70vh; overflow-y: scroll;">
					<div class="list-group list-group-flush" >
						${this.dishes}
					</div>
				</div>
				<div class="column ml-5">
					<div class="card cardShadow" style="width: 18rem;">
						<h5 class="card-header header-addDish">${lang.labels.newDish}</h5>
				  		<div class="card-body">
					    	<div class="form-group">
					    		<input type="text" class="form-control" placeholder="${lang.labels.name}" id="nameBox">
				    		</div>
				    		<div class="form-group">
				    			<select class="custom-select" id="categorySelect">
									<option selected value="-1">${lang.advice.selectCat}</option>
									${this.categories}
								</select>
				    		</div>
				    		<div class="form-group">
				    			<div class="form-check">
									<input
										class="form-check-input"
										type="radio"
										name="newPlateType"
										id="newfirst"
										value="first"
										checked
									>
									<label class="form-check-label" for="newFirst">
										${lang.labels.first}
									</label>
								</div>
								<div class="form-check">
									<input
										class="form-check-input"
										type="radio"
										name="newPlateType"
										id="newSecond"
										value="second"
									>
									<label class="form-check-label" for="newSecond">
										${lang.labels.second}
									</label>
								</div>
								<div class="form-check">
									<input
										class="form-check-input"
										type="radio"
										name="newPlateType"
										id="newSide"
										value="side"
									>
									<label class="form-check-label" for="newSide">
										${lang.labels.side}
									</label>
								</div>
				    		</div>
				    		<div class="form-group input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">${lang.labels.numSides}</span>
								</div>
								<input
				    				type="number"
				    				class="form-control"
				    				id="numSides"
				    				step="1"
				    				value="0"
				    				min="0"
				    				max="10"
				    			>
							</div>
				    		<button class="btn btn-addCat" onclick="_this.add()">${lang.labels.add}</button>
				  		</div>
					</div>
				</div>
			</div>
		`;
	}

	add() {
		let name = $('#nameBox').val();
		let cat = $('#categorySelect').val();
		if(name && cat > -1) {
			let type = $('input:radio[name="newPlateType"]:checked').val();
			let numSides = type === 'side' ? 0 : $('#numSides').val();
			db.addDish({
				name: name,
				category: cat,
				type: type,
				numSides: numSides
			});
			this.render();
		}
		
	}

	edit(index) {
		if(this.editing) {
			return;
		}
		this.editing = true;
		let dish = db.dishes[index];
		let selector = $('#dish_' + index);
		selector.empty();
		let html = `
			<div class="form-group">
	    		<input
	    			type="text"
	    			class="form-control"
	    			placeholder="${lang.labels.name}"
	    			id="editNameBox"
	    			value="${dish.name}"
	    		>
    		</div>
    		<div class="form-group">
    			<select
    				class="custom-select"
    				id="editCategorySelect"
    			>
					<option value="-1">${lang.advice.selectCat}</option>
					${this.categories}
				</select>
    		</div>
    		<div class="form-group">
    			<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						name="editPlateType"
						id="editFirst"
						value="first"
						${dish.type === 'first' ? 'checked' : ''}
					>
					<label class="form-check-label" for="newFirst">
						${lang.labels.first}
					</label>
				</div>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						name="editPlateType"
						id="editFirst"
						value="second"
						${dish.type === 'second' ? 'checked' : ''}
					>
					<label class="form-check-label" for="newSecond">
						${lang.labels.second}
					</label>
				</div>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						name="editPlateType"
						id="editSide"
						value="side"
						${dish.type === 'side' ? 'checked' : ''}
					>
					<label class="form-check-label" for="newSide">
						${lang.labels.side}
					</label>
				</div>
    		</div>
    		<div class="form-group input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">${lang.labels.numSides}</span>
				</div>
				<input
    				type="number"
    				class="form-control"
    				id="editNumSides"
    				step="1"
    				value="${dish.numSides}"
    				min="0"
    				max="10"
    			>
			</div>
			<div class="input-group justify-content-between">
				<button class="btn btn-addCat" onclick="_this.save(${index})">${lang.labels.save}</button>
				<button class="btn btn-outline-danger" onclick="_this.delete(${index})">${lang.labels.delete}</button>
			</div>
    		
		`;
		selector.append(html);
		$('#editCategorySelect').val(dish.category);
	}

	save(index) {
		let dish = db.dishes[index];
		let name = $('#editNameBox').val();
		let cat = $('#editCategorySelect').val();
		if(name && cat > -1) {
			let type = $('input:radio[name="editPlateType"]:checked').val();
			let numSides = type === 'side' ? 0 : $('#editNumSides').val();
			dish.name = name;
			dish.category = cat;
			dish.type = type;
			dish.numSides = numSides;
			db.editDish(index, dish);
			this.render();
		}
	}

	delete(index) {
		db.removeDish(index);
		this.render();
	}

	render() {
		this.editing = false;
		this.dishes = '';
		this.categories = '';
		let main = $('main');
		main.empty();

		if(db.categories.length > 0) {
			db.categories.forEach((s, i) => {
				this.categories += `<option value="${i}">${s}</option>`
			});
		} else {
			this.categories = `<option>${lang.advice.addCat}</option>`
		}

		if(db.dishes.length > 0) {
			db.dishes.forEach((dish, i) => {
				let symbol = []
				this.dishes += `
					<div
						class="list-group-item list-group-item-action dishItem"
						id="dish_${i}"
					>
						<div class="d-flex justify-content-between align-items-center">
							<h5>${dish.name}</h5>
							<small class="editIcon" onclick="_this.edit(${i})">${lang.labels.edit}</small>
						</div>
						<div class="d-flex justify-content-between align-items-center">
							<p>${lang.labels[dish.type]}</p>
							${dish.type === 'side' ?
								'' : `
									<span class="badge badge-primary badge-pill">
										${dish.numSides}
									</span>
								`
							}
							
						</div>
					</div>
				`;
			})
		} else {
			this.dishes = `<li class="list-group-item">${lang.advice.addDish}</li>`
		}

		main.append(this.html());

		// Check to hide num sides box
		$('input:radio[name="newPlateType"]').change((e) => {
			if(e.target.value === 'side') {
				$('#numSides').hide();
			} else {
				$('#numSides').show();
			}
		});
	}
}