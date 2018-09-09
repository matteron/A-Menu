const Menu = require('./logic/menu.js')
let menu = new Menu()
let english = false;

function generate(){
    menu.generateWeek()
    populatePage(menu.current, menu.ingredients)
}

function language() {
    let local = {
        "Monday": (english ? "Mon" : "Lun"),
        "Tuesday": (english ? "Tue" : "Mar"),
        "Wednesday": (english ? "Wed" : "Mer"),
        "Thursday": (english ? "Thu" : "Gio"),
        "Friday": (english ? "Fri" : "Ven"),
        "Saturday":(english ? "Sat" : "Sab"),
        "Sunday": (english ? "Sun" : "Dom"),
        "Lunch": (english ? "Lunch" : "Pranzo"),
        "Dinner": (english ? "Dinner" : "Cena"),
        "Ingredients": (english ? "Ingredients": "Ingredienti")
    }
    for(propertyName in menu.current){
        document.getElementById(propertyName + '-title').innerText = local[propertyName]
    }
    let lunch = document.getElementsByClassName('lunch-title')
    Array.prototype.forEach.call(lunch, function(el) { 
        el.innerText = local["Lunch"]
    });
    let dinner = document.getElementsByClassName('dinner-title')
    Array.prototype.forEach.call(dinner, function(el) { 
        el.innerText = local["Dinner"]
    });
    document.getElementById("ingredient-title").innerText = local["Ingredients"]
    english = !english
}

function lock(path){

}

function populatePage(current, ingredients){
    for(propertyName in menu.current){
        if(current[propertyName].Lunch1.meal.item){
            document.getElementById(propertyName + '-lunch1').innerText = "1. " + current[propertyName].Lunch1.meal.item.name;
            if(current[propertyName].Lunch1.sides.state){
                document.getElementById(propertyName + '-lunch1').innerText += ("\n | con " + current[propertyName].Lunch1.sides.side1.item.name+ "\n | e" + current[propertyName].Lunch1.sides.side2.item.name)
            }
        }
        if(current[propertyName].Lunch2.meal.item){
            document.getElementById(propertyName + '-seperator').innerText = '- - - - - - - - - - - - -'
            document.getElementById(propertyName + '-seperator').style.color = '#DDDED3'
            document.getElementById(propertyName + '-seperator').style.textAlign = 'center'
            document.getElementById(propertyName + '-lunch2').innerText = "2. " + current[propertyName].Lunch2.meal.item.name;
            if(current[propertyName].Lunch2.sides.state){
                document.getElementById(propertyName + '-lunch2').innerText += ("\n | con " + current[propertyName].Lunch2.sides.side1.item.name + "\n | e " + current[propertyName].Lunch2.sides.side2.item.name)
            }
        }
        if(current[propertyName].Dinner.meal.item){
            document.getElementById(propertyName + 'dinner').innerText = current[propertyName].Dinner.meal.item.name;
            if(current[propertyName].Dinner.sides.state){
                document.getElementById(propertyName + '-dinner').innerText += ("\n | con " + current[propertyName].Dinner.sides.side1.item.name + "\n | e " + current[propertyName].Dinner.sides.side2.item.name)
            }
        }
    }
}