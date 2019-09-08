const Store = require('electron-store');
const dayList = require('../components/dayList.js');

module.exports = class DB {
	constructor(dayList) {
		this.store = new Store();
		this.categories = [];
		this.recipes = [];
		this.daySettings = {};

		this.pullCategories();
		this.pullDays();
	}

	pullCategories() {
		this.categories = this.store.get('categories');
		if (!this.categories) {
			this.categories = [];
		}
	}

	saveCategories() {
		this.store.set('categories', this.categories);
	}

	addCategory(name) {
		this.categories.push(name);
		this.saveCategories();
	}

	renameCategory(index, name) {
		this.categories[index] = name;
		this.saveCategories();
	}

	removeCategory(index) {
		this.categories.splice(index, 1);
		this.saveCategories();
	}

	pullDays() {
		this.daySettings = this.store.get('daySettings');
		if (!this.daySettings) {
			this.daySettings = {};
			let emptyMeal = {
				first: false,
				second: false,
				sides: false
			}
			dayList.forEach((day) => {
				this.daySettings[day] = {
					lunch: emptyMeal,
					dinner: emptyMeal,
					categories: []
				}
			});
			this.saveDays();
		}
	}

	saveDays() {
		this.store.set('daySettings', this.daySettings);
	}

}