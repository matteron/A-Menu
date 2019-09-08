const en = {
	mon: "Monday",
	tue: "Tuesday",
	wed: "Wednesday",
	thu: "Thursday",
	fri: "Friday",
	sat: "Saturday",
	sun: "Sunday",
	labels: {
		lunch: 'Lunch',
		dinner: 'Dinner',
		first: 'First',
		second: 'Second',
		sides: 'Sides',
		categories: 'Categories',
		newCategory: 'New Category',
		add: 'Add',
		name: 'Name',
		save: 'Save',
		cancel: 'Cancel'
	},
	nav: {
		home: 'Home',
		dishes: 'Manage Dishes',
		categories: 'Manage Categories',
		generate: 'Generate'
	}
};

const it ={
	mon: "lunedì",
	tue: "martedì",
	wed: "mercoledì",
	thu: "giovedì",
	fri: "venerdì",
	sat: "sabato",
	sun: "domenica",
	labels: {
		lunch: 'Pranzo',
		dinner: 'Cena',
		first: 'Primo',
		second: 'Secondo',
		sides: 'Contorni',
		categories: 'Categorie',
		newCategory: 'Nuova Categoria',
		add: 'Aggiungi',
		name: 'Nome',
		save: 'Salva',
		cancel: 'Cancela'
	},
	nav: {
		home: 'Casa',
		dishes: 'Maneggiare Piati',
		categories: 'Maneggiare Categorie',
		generate: 'Generare'
	}
};

module.exports = (lang) => (lang === 'en' ? en : it);