const DBService = require('./services/db.service.js');
const Days = require('./pages/days.js');
const CatManager = require('./pages/categories.js');
const dayList = require('./components/dayList.js');
const lang = require('./components/lang.js')('en');
const DaySettings = require('./pages/daySettings.js');
const Dishes = require('./pages/dishes.js');

var db = new DBService(dayList);

const pages = {
	days: new Days(db, dayList, lang),
	categories: new CatManager(db, lang),
	dishes: new Dishes(db, lang)
}

function render(page) {
	_this = pages[page];
	pages[page].render();
}

function editDay(day) {
	_this = new DaySettings(db, day, lang)
	_this.render();
}

function generate() {
	render('days');
	_this.generate();
}

function langNav(){
	[
		'home',
		'dishes',
		'categories',
		'generate'
	].forEach((id) => {
		let selector = $('#' + id + 'Link')
		selector.empty();
		selector.append(lang.nav[id]);
	});
}

$(document).ready(() => {
	langNav();
	render('days');
});