module.exports = class CatManager {
	constructor(db, lang) {
		this.htmlStart = `<div class="container-fluid">`
		this.htmlEnd = `</div>`
		this.categories = '';
	}

	html() {
		return `
			<div class="container-fluid row" id="categories">
				<div class="column card cardShadow" style="width: 22rem; max-height: 70vh; overflow-y: scroll;">
					<ul class="list-group list-group-flush" >
						${this.categories}
					</ul>
				</div>
				<div class="column ml-5">
					<div class="card cardShadow" style="width: 18rem;">
						<h5 class="card-header header-addCat">${lang.labels.newCategory}</h5>
				  		<div class="card-body">
					    	<div class="form-group">
					    		<input type="text" class="form-control" placeholder="${lang.labels.name}" id="addinput">
				    		</div>
				    		<button class="btn btn-addCat" onclick="_this.add()">${lang.labels.add}</button>	
				  		</div>
					</div>
				</div>
			</div>
		`
	};

	add() {
		let input = $('#addinput');
		let name = input.val();
		if(name) {
			input.val('');
			db.addCategory(name);
			this.render();
		}
	}

	edit(index) {
		let name = db.categories[index];
		let entry = $('#cat_' + index);
		entry.empty();
		let inputBox = `
			<div class="form-inline">
				<input type="text" class="form-control mr-3" id="edit_${index}" value="${name}">
				<button class="btn btn-primary float-right" onclick="_this.save(${index})">Save</button>
			</div>
		`;
		entry.append(inputBox);
	}

	save(index) {
		let name = $('#edit_' + index).val();
		db.renameCategory(index, name);
		this.render();
	}

	delete(index) {
		db.removeCategory(index);
		this.render();
	}

	render() {
		let main = $('main');
		main.empty();
		this.categories = '';
		if(db.categories.length > 0) {
			db.categories.forEach((s, i) => {
				this.categories += `
					<li class="list-group-item catItem d-flex justify-content-between align-items-center" id="cat_${i}">
						<span class="d-flex align-items-center">
							${s}
							<small class="editIcon ml-3" onclick="_this.edit(${i})">${lang.labels.edit}</small>
						</span>
						<span class="editIcon" onclick="_this.delete(${i})">&times;</span>
					</li>
				`
			});
		} else {
			this.categories = `<li class="list-group-item">${lang.advice.addCat}</li>`;
		}
		main.append(this.html());
	}
}