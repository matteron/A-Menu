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

    generateWeek(current) {
        let checkArray = []
        if(current){
            this.current = current
            //check locks and reset any unlocked ones
        } else {
            this.current = require('../data/current.json')
        }
        this.current["Monday"].Lunch1.meal.item = this.menu["mains"]["legume"]["pastaAndPeas"]
        this.current["Monday"].Lunch2.meal.item = this.menu["mains"]["eggs"]["omlette"]
        this.current["Monday"].Lunch2.sides.state = true
        this.current["Monday"].Lunch2.sides.side1.item = {"name":"potate"}
        this.current["Monday"].Lunch2.sides.side2.item = {"name":"beans"}
    }

    saveDefaults(){
        var json = JSON.stringify(this.defaults);
        var fs = require('fs');
        fs.writeFile('./data/default.json', json, (err) => {
            if (err) throw err;
            console.log('Defaults have been saved!');
        });
    }
};

module.exports = Menu;