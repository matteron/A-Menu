const weekcard = require('../components/card.js');

module.exports = class Days {
	constructor(db, dayList, lang) {
		this.weekdays = [];
		dayList.forEach((day) => {
			this.weekdays.push(new weekcard(day, lang, db.daySettings[day]));
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
			weekcard.createMeals(remainingDishes);
		});
	}

	createMeals(dishes, settings) {
		let lunchDishes = dishes.filter(
			(d) => settings.lunch.categories[d.category]
		);

		let dinnerDishes = dishes.filter(
			(d) => settings.dinner.categories[d.category]
		);

		const meal = {
			lunch: {
				first: lunchDishes.filter(d => d.type = 'first'),
				second: lunchDishes.filter(d => d.type = 'second'),
				sides: lunchDishes.filter(d => d.type = 'sides'),
			},
			dinner: {
				first: dinnerDishes.filter(d => d.type = 'first'),
				second: dinnerDishes.filter(d => d.type = 'second'),
				sides: dinnerDishes.filter(d => d.type = 'sides'),
			}
		};

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