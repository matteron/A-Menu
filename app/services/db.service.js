const Store = require('electron-store');
const dayList = require('../components/dayList.js');

module.exports = class DB {
	constructor(dayList) {
		this.store = new Store();
		this.categories = [];
		this.dishes = [];
		this.daySettings = {};

		this.pullCategories();
		this.pullDays();
		this.pullDishes();
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
				sides: false,
				categories: []
			}
			dayList.forEach((day) => {
				this.daySettings[day] = {
					lunch: emptyMeal,
					dinner: emptyMeal,
				}
			});
			this.saveDays();
		}
	}

	saveDays() {
		this.store.set('daySettings', this.daySettings);
	}

	pullDishes() {
		this.dishes = this.store.get('dishes');
		if(!this.dishes) {
			this.dishes = [];
		}
	}

	saveDishes() {
		this.store.set('dishes', this.dishes);
	}

	addDish(dish) {
		this.dishes.push(dish);
		this.saveDishes();
	}

	editDish(index, dish) {
		this.dishes[index] = dish;
		this.saveDishes();
	}

	removeDish(index) {
		this.dishes.splice(index, 1);
		this.saveDishes();
	}
}