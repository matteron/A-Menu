const haipa = require('haipa')(false);
const { div, h5, small, ul } = haipa.tags;
const { classes, style } = haipa.attr;

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
			(acc, cur) => {
				acc[cur] = dishes.filter((d) => this.daySettings[cur].categories[d.category])
				return acc;
			}, {}
		);

		times.forEach(t => {
			groups.forEach(g => {
				this.meals[t][g] = filtered[t].filter(d => d.type == g);
			})
		});
	}

	mealHtml(meal) {
		
	}

	mealHTML() {
		return '';
	}

	lunchHTML() {
		return '';
	}

	dinnerHTML() {
		return '';
	}

	html() {
		return div([classes`card weekcard cardShadow`], [
			div([
				classes(`d-flex justify-content-between align-items-center card-header header-${this.weekday}`),
				style`cursor: pointer`,
				`onclick="editDay('${this.weekday}')"`
			], [
				h5([classes`mb-0`], [ lang[this.weekday] ]),
				small([classes`editIcon`], [lang.labels.edit])
			]),
			div([classes`card-body`], [
				h5([classes`card-title`], [lang.labels.lunch]),
				ul([classes`card-text`], [this.lunchHTML()])
			]),
			div([classes`card-body`], [
				h5([classes`card-title`], [lang.labels.dinner]),
				ul([classes`card-text`], [this.dinnerHTML()])
			]),
		]);
	}

	render() {
		return this.html();
	}
}