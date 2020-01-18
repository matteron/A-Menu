module.exports = class WeekCard {

	constructor(weekday, lang, daySettings) {
		this.weekday = weekday;
		this.meals = {
			lunch: {
				first: '',
				second: '',
				sides: ''
			},
			dinner: {
				first: '',
				second: '',
				sides: ''
			}
		};
		this.daySettings = daySettings;
		this.lunchHTML = '';
		this.dinnerHTML = '';
	}

	createMeals(dishes) {
		const times = [
			'lunch',
			'dinner'
		];

		const groups = [
			'first',
			'second',
			'sides'
		];

		let filtered = times.reduce(
			(acc, cur) => acc[cur] = dishes.filter((d) => settings[cur].categories[d.category]), {}
		);

		times.forEach(t => {
			groups.forEach(g => {
				this.meals[t][g] = filtered[t].filter(d => d.type == g);
			})
		});
		console.log(this.meals);
	}

	html() {
		return `
			<div class="card weekcard cardShadow">
				<div
					class="d-flex justify-content-between align-items-center card-header header-${this.weekday}"
					onclick="editDay('${this.weekday}')"
					style="cursor: pointer;"
				>
					<h5 class="mb-0">
						${lang[this.weekday]}
					</h5>
					<small class="editIcon">${lang.labels.edit}</small>
				</div>
				<div class="card-body">
					<h5 class="card-title">${lang.labels.lunch}</h5>
					<p class="card-text">
						${this.lunchHTML}
					</p>
				</div>
				<div class="card-body">
					<h5 class="card-title">${lang.labels.dinner}</h5>
					<p class="card-text">
						${this.dinnerHTML}
					</p>

				</div>
			</div>
		`;
	}

	render() {
		return this.html();
	}
}