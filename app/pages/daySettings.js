module.exports = class DaySettings {
	constructor(db, day, lang) {
		this.day = day;
		this.lang = lang;

		this.categories = [];
	}

	html(mealsettings, categories) {
		return `
			<div class="container-fluid row" id="days">
				<div class="card weekcard cardShadow" style="max-height: 75vh;">
					<h5 class="card-header header-${this.day}">
						${this.lang[this.day]}
					</h5>
					<div class="card-body row justify-content-around">
						<div class="column">
							<h5>${lang.labels.lunch}</h5>
							<div class="pl-3 mb-2">
								<div class="input-group">
									<input
										class="form-check-input"
										type="checkbox"
										${mealsettings.lunch.first ? 'checked' : ''}
										id="lunch_first"
									>
									<label class="form-check-label" for="lunch_first">
										${lang.labels.first}
									</label>
								</div>
								<div class="input-group">
									<input
										class="form-check-input"
										type="checkbox"
										${mealsettings.lunch.second ? 'checked' : ''}
										id="lunch_second"
									>
									<label class="form-check-label" for="lunch_second">
										${lang.labels.second}
									</label>
								</div>
								<div class="input-group">
									<input
										class="form-check-input"
										type="checkbox"
										${mealsettings.lunch.sides ? 'checked' : ''}
										id="lunch_sides"
									>
									<label class="form-check-label" for="lunch_sides">
										${lang.labels.sides}
									</label>
								</div>
							</div>
						</div>

						<div class="column">
							<h5>${lang.labels.dinner}</h5>
							<div class="pl-3">
								<div class="input-group">
									<input
										class="form-check-input"
										type="checkbox"
										${mealsettings.dinner.first ? 'checked' : ''}
										id="dinner_first"
									>
									<label class="form-check-label" for="dinner_first">
										${lang.labels.first}
									</label>
								</div>
								<div class="input-group">
									<input
										class="form-check-input"
										type="checkbox"
										${mealsettings.dinner.second ? 'checked' : ''}
										id="dinner_second"
									>
									<label class="form-check-label" for="dinner_second">
										${lang.labels.second}
									</label>
								</div>
								<div class="input-group">
									<input
										class="form-check-input"
										type="checkbox"
										${mealsettings.dinner.sides ? 'checked' : ''}
										id="dinner_sides"
									>
									<label class="form-check-label" for="dinner_sides">
										${lang.labels.sides}
									</label>
								</div>
							</div>
						</div>
					</div>
					<h5 class="mb-0 pl-4">${lang.labels.categories}</h5>
					<div class="card-body row justify-content-center pt-0"  style="overflow-y: scroll;">
						<ul class="list-group list-group-flush w-100 px-4">
							${categories}
						</ul>
					</div>
				</div>
			</div>
			<div class="container-fluid row" id="days">
				<button
					class="btn btn-outline-dark mr-4"
					onclick="render('days')"
					style="width: 5rem"
				>
					${lang.labels.cancel}
				</button>
				<button
					class="btn btn-addCat ml-4"
					onclick="_this.save()"
					style="width: 5rem"
				>
					${lang.labels.save}
				</button>
			</div>
		`;
	}

	save() {
		let meals = [
			'lunch',
			'dinner'
		];
		let section = [
			'first',
			'second',
			'sides'
		];

		meals.forEach((meal) => {
			section.forEach((sec) => {
				db.daySettings[this.day][meal][sec] = $('#' + meal + '_' + sec).prop('checked');
			});
		});

		db.categories.forEach((_, i) => {
			db.daySettings[this.day].categories[i] = $('#cat_' + i).prop('checked');
		});

		db.saveDays();
		render('days');
	}

	render() {
		let main = $('main');
		main.empty();

		let settings = db.daySettings[this.day];

		let htmlCats = '';
		db.categories.forEach((cat, i) => {
			htmlCats += `
				<li class="list-group-item">
					<input
						class="form-check-input"
						type="checkbox"
						${db.daySettings[this.day].categories[i] ? 'checked' : ''}
						id="cat_${i}">
					<label class="form-check-label" for="cat_${i}">
						${cat}
					</label>
				</li>
			`;
		});

		main.append(this.html(settings, htmlCats));
	}
}