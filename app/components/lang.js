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
		side: 'Side',
		sides: 'Sides',
		categories: 'Categories',
		newCategory: 'New Category',
		add: 'Add',
		name: 'Name',
		save: 'Save',
		delete: 'Delete',
		cancel: 'Cancel',
		newDish: 'New Dish',
		numSides: 'Number of Sides',
		edit: 'Edit'
	},
	nav: {
		home: 'Home',
		dishes: 'Manage Dishes',
		categories: 'Manage Categories',
		generate: 'Generate'
	},
	advice: {
		addCat: 'Add a category to start!',
		selectCat: 'Please Select a Category',
		addDish: 'Add a dish to start!'
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
		side: 'Contorno',
		sides: 'Contorni',
		categories: 'Categorie',
		newCategory: 'Categoria Nuova',
		add: 'Aggiungi',
		name: 'Nome',
		save: 'Salva',
		delete: 'Elimina',
		cancel: 'Cancela',
		newDish: 'Piatto Nuovo',
		numSides: 'Quanti Contorni',
		edit: 'Modifica'
	},
	nav: {
		home: 'Pagina Iniziale',
		dishes: 'Configura i Piatti',
		categories: 'Configura Categorie',
		generate: 'Genera'
	},
	advice: {
		addCat: 'Aggiungi una categoria per iniziare!',
		selectCat: 'Seleziona una Categoria',
		addDish: 'Aggiungi un piatto per iniziare!'
	}
};

module.exports = (lang) => (lang === 'en' ? en : it);