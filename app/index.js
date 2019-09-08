const DBService = require('./services/db.service.js');
const Days = require('./pages/days.js');
const CatManager = require('./pages/categories.js');
const dayList = require('./components/dayList.js');
const lang = require('./components/lang.js')('it');
const DaySettings = require('./pages/daySettings.js');

var db = new DBService(dayList);

const pages = {
	days: new Days(db, dayList, lang),
	categories: new CatManager(db, lang)
}

function render(page) {
	_this = pages[page];
	pages[page].render();
}

function editDay(day) {
	_this = new DaySettings(db, day, lang)
	_this.render();
}

$(document).ready(() => {
	[
		'home',
		'dishes',
		'categories',
		'generate'
	].forEach((id) => {
		let selector = $('#' + id + 'Link')
		selector.empty();
		selector.append(lang.nav[id]);
	})
	render('days');
});