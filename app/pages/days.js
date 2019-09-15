const weekcard = require('../components/card.js');

module.exports = class Days {
	constructor(db, dayList, lang) {
		this.weekdays = [];
		dayList.forEach((day) => {
			this.weekdays.push(new weekcard(day, lang));
		});
		this.dayCards = '';
	}

	html() {
		return `
			<div class="container-fluid row" id="days">
				${this.dayCards}
			</div>
		`;
	}

	generate() {
		let remainingDishes = db.dishes;
		let day = '';
		let settings = {};
		let filteredDishes = [];
		let meal = {};
		this.weekdays.forEach((weekcard) => {
			day = weekcard.weekday;
			settings = db.daySettings[day];
			meal = this.createMeal(remainingDishes, settings);
		});
	}

	createMeal(dishes, settings) {
		let meal = {
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

		let lunchDishes = dishes.filter(
			(d) => settings.lunch.categories[d.category]
		);
		let lunchFirsts = lunchDishes.filter(d => d.type = 'first');
		let lunchSeconds = lunchDishes.filter(d => d.type = 'second');


		return meal;
	}
	

	render() {
		let main = $('main');
		main.empty();
		this.dayCards = '';
		this.weekdays.forEach((day) => {
			this.dayCards += day.render();
		});
		main.append(this.html());
	}
}