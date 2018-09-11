class Menu {

    constructor() {
        this.defaults = require('../data/default.json')
        this.menu = require('../data/menu.json')
        this.current = require('../data/current.json')
    }

    pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
               result = prop;
        return result;
    }

    generateWeek() {
        
        for(day in this.defaults){
            let catLunch1 = []
            let catLunch2 = []
            let catDinner = []
            if(this.current[day].locked){

            } else {
                // build category arrays
                for(cat in this.defaults[day]["Lunch1"]){
                    if(this.defaults[day]["Lunch1"][cat]){
                        catLunch1.push(cat)
                    }
                    if(this.defaults[day]["Lunch2"][cat]){
                        catLunch2.push(cat)
                    }
                    if(this.defaults[day]["Dinner"][cat]){
                        catDinner.push(cat)
                    }
                }

                let indexL1 = Math.floor(Math.random() * catLunch1.length);
                let indexL2 = Math.floor(Math.random() * catLunch2.length);
                let indexD  = Math.floor(Math.random() * catDinner.length);

                
            }
        }
    }

    saveDefaults(){
        var json = JSON.stringify(this.defaults);
        var fs = require('fs');
        fs.writeFile('./data/default.json', json, (err) => {
            if (err) throw err;
            console.log('Defaults have been saved!');
        });
    }

    addMeal(meal, main, category){
        if(main){
            this.menu["mains"][category].push(meal)
        } else {
            this.menu["sides"].push(meal)
        }

        this.saveMenu()
    }
    deleteMeal(main, category, index){
        if(main){
            this.menu["mains"][category].splice(index,1)
        } else {
            this.menu["sides"].splice(index,1)
        }
    }

    saveMenu(){
        var json = JSON.stringify(this.menu);
        var fs = require('fs');
        fs.writeFile('./data/menu.json', json, (err) => {
            if (err) throw err;
            console.log('Menu has been saved!');
        });
    }
};

module.exports = Menu;