class Menu {

    constructor() {
        this.defaults = require('../data/default.json')
        this.menu = require('../data/menu.json')
        this.current = require('../data/current.json')
        this.saved = require('../data/savedCurrent.json')
        if(!this.saved.clear){
            this.current = this.saved
        }
    }

    generateWeek() {
        let takenMeal = []
        // clear current and generate taken food spots
        for(var day in this.current){
            if(!this.current[day].locked){
                for(var cat in this.current[day]){
                    if(cat !== "locked"){
                        if(!this.current[day][cat].meal.locked){
                            this.current[day][cat].meal.item = null
                        } else {
                            takenMeal.push(this.current[day][cat].meal.item)
                        }
                        if(!this.current[day][cat].sides.side1.locked){
                            this.current[day][cat].sides.side1.item = null
                        }
                        if(!this.current[day][cat].sides.side2.locked){
                            this.current[day][cat].sides.side2.item = null
                        }
                    }
                }
            }
        }

        for(var day in this.defaults){
            
            if(!this.current[day].locked){
                let catLunch1 = []
                let catLunch2 = []
                let catDinner = []
                // build category arrays
                for(var cat in this.defaults[day]["Lunch1"]){
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
                let categories = {
                    "Lunch1": catLunch1,
                    "Lunch2": catLunch2,
                    "Dinner": catDinner
                }
                
                for(var squareMeal in this.current[day]) {
                    if((day === "Sunday" && squareMeal === "Dinner") || squareMeal === "locked"){
                        continue;
                    }
                    let catIndex, itemIndex, pass
                    do {
                        catIndex = categories[squareMeal][Math.floor(Math.random() * categories[squareMeal].length)];
                        itemIndex = Math.floor(Math.random() * this.menu["mains"][catIndex].length);
                        pass = false
                        takenMeal.forEach((meal) => {
                            if(meal === this.menu.mains[catIndex][itemIndex]){
                                pass = true
                            }
                        })
                    } while(pass)
                    this.current[day][squareMeal].meal.item = this.menu.mains[catIndex][itemIndex]
                    takenMeal.push(this.current[day][squareMeal].meal.item)
                    if(this.current[day][squareMeal].meal.item.sides){
                        this.chooseSides(this.current[day][squareMeal].sides)
                    } else {
                        this.current[day][squareMeal].sides.state = false
                    }
                }
            }
        }
    }

    chooseSides(sides){
        sides.state = true
        let side1Index = Math.floor(Math.random() * this.menu["sides"].length);
        let side2Index;
        do {
            side2Index = Math.floor(Math.random() * this.menu["sides"].length);
        }while(side1Index === side2Index)
        sides.side1.item = this.menu.sides[side1Index]
        sides.side2.item = this.menu.sides[side2Index]
    }

    saveDefaults(){
        var json = JSON.stringify(this.defaults);
        var fs = require('fs');
        fs.writeFile('./data/default.json', json, (err) => {
            if (err) throw err;
            console.log('Defaults have been saved!');
        });
    }

    saveCurrent(){
        var json = JSON.stringify(this.current);
        var fs = require('fs');
        fs.writeFile('./data/savedCurrent.json', json, (err) => {
            if (err) throw err;
            console.log('Current has been saved!');
        });
    }
    resetCurrent(){
        this.current = require('../data/current.json')
        var json = JSON.stringify({"clear": true});
        var fs = require('fs');
        fs.writeFile('./data/savedCurrent.json', json, (err) => {
            if (err) throw err;
            console.log('Current has been reset!');
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