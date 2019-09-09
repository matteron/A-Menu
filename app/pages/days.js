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
		this.remainingDishes = db.dishes;
		this.weekdays.forEach((weekcard) => {
			let day = weekcard.weekday;
			let settings = db.daySettings[day];
		})
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