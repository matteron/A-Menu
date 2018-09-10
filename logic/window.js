const Menu = require('./logic/menu.js')
const MicroModal = require('micromodal');
MicroModal.init();

let menu = new Menu()
let english = true

function local(string){
    return{
        "Monday": (english ? "Mon" : "Lun"),
        "Tuesday": (english ? "Tue" : "Mar"),
        "Wednesday": (english ? "Wed" : "Mer"),
        "Thursday": (english ? "Thu" : "Gio"),
        "Friday": (english ? "Fri" : "Ven"),
        "Saturday":(english ? "Sat" : "Sab"),
        "Sunday": (english ? "Sun" : "Dom"),
        "Lunch": (english ? "Lunch" : "Pranzo"),
        "Dinner": (english ? "Dinner" : "Cena"),
        "Ingredients": (english ? "Ingredients" : "Ingredienti"),
        "Generate": (english ? "Create Menu" : "Crea Menu")
    }[string]
}

function generate(){
    menu.generateWeek()
    populatePage(menu.current, menu.ingredients)
}

function language() {
    english = !english
    for(propertyName in menu.current){
        document.getElementById(propertyName + '-title').innerText = local(propertyName)
    }
    let lunch = document.getElementsByClassName('lunch-title')
    Array.prototype.forEach.call(lunch, function(el) { 
        el.innerText = local("Lunch")
    });
    let dinner = document.getElementsByClassName('dinner-title')
    Array.prototype.forEach.call(dinner, function(el) { 
        el.innerText = local("Dinner")
    });
    document.getElementById("ingredient-title").innerText = local("Ingredients")
}

function openSettings(day){
    document.getElementById("modal-title").innerText = local(day);
    document.getElementById("save-button").onclick = function () { saveSettings(day); };

    let properties = []
    for(property in menu.defaults[day]["Lunch1"]){
        properties.push(property)
    }
    properties.some(function(property) {
        document.getElementById(property + '-primo').checked = menu.defaults[day]["Lunch1"][property]
        document.getElementById(property + '-secondo').checked = menu.defaults[day]["Lunch2"][property]
        document.getElementById(property + '-cena').checked = menu.defaults[day]["Dinner"][property]
        return property === "eggs"
    })
    MicroModal.show('modal');
}
function saveSettings(day){
    let properties = []
    for(property in menu.defaults[day]["Lunch1"]){
        properties.push(property)
    }
    properties.some(function(property) {
        menu.defaults[day]["Lunch1"][property] = document.getElementById(property + '-primo').checked
        menu.defaults[day]["Lunch2"][property] = document.getElementById(property + '-secondo').checked
        menu.defaults[day]["Dinner"][property] = document.getElementById(property + '-cena').checked
        return property === "eggs"
    })
    MicroModal.close('modal');
}
function saveDefaults(){
    menu.saveDefaults();
}
function showAddMeal(){
    MicroModal.close('viewmeal-modal')
    MicroModal.show('addmeal-modal')
}
function addMeal(){
    let main = document.getElementById("mealtype-main").checked
    let meal = {
        name: document.getElementById("addmeal-name").value
    }
    let ing = document.getElementById("addmeal-ingredients").value.split("\n")
    meal["ingredients"] = ing

    let category = document.getElementById("addmeal-categories").value
    
    if(main){
        meal["sides"] = document.getElementById("addmeal-contorni").checked
    }
    if(meal.name){
        MicroModal.close('addmeal-modal')
        menu.addMeal(meal, main, category)
        showViewMeal()
    }
}
function toggleAddMealOptions(show){
    if(show){
        document.getElementById("addmeal-categoryText").style.display = "inline";
        document.getElementById("addmeal-categories").style.display = "inline";
        document.getElementById("addmeal-sideText").style.display = "inline";
        document.getElementById("addmeal-contorni").style.display = "inline";
    } else {
        document.getElementById("addmeal-categoryText").style.display = "none";
        document.getElementById("addmeal-categories").style.display = "none";
        document.getElementById("addmeal-sideText").style.display = "none";
        document.getElementById("addmeal-contorni").style.display = "none";
    }
}
function populateViewMeal(){
    for(category in menu.menu["mains"]){

        document.getElementById("view-" + category).innerHTML = ""

        for(item in menu.menu["mains"][category]){
            let newel = `
            <div style="display: flex">
            <p>` + menu.menu["mains"][category][item].name +`</p>
            <input type="button" class="settings" value="✏️" onclick=""/>
            <input type="button" class="settings" value="❌" onclick="` + "deleteMeal(true, " + `'` + category + `'` + ", " + item + ")" + `"/>
            </div>
            `
            document.getElementById("view-" + category).innerHTML += newel
        }
    }
    document.getElementById("view-sides").innerHTML = ""
    for(item in menu.menu["sides"]){
        let newel = `
        <div style="display: flex">
        <p>` + menu.menu["sides"][item].name +`</p>
        <input type="button" class="settings" value="✏️" onclick=""/>
        <input type="button" class="settings" value="❌" onclick="` + "deleteMeal(false, null, " + item + ") " + `"/>
        </div>
        `
        document.getElementById("view-sides").innerHTML += newel
    }
}
function showViewMeal(){
    populateViewMeal();
    MicroModal.show("viewmeal-modal")
}
function showEditMeal(main, category, index){

}
function deleteMeal(main, category, index){
    menu.deleteMeal(main,category, index)
    populateViewMeal();
}

function saveViewMeal(){
    MicroModal.close("viewmeal-modal")
    menu.saveMenu();
}

function lock(day, meal, side){
    if(day && meal && side){
        
    } else if (day && meal){

    } else if (day) {
        
    }
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