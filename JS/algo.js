/*  on va chercher l input tapé et on tri avec un filter nos recipes pour garder celle qui sont correspondantes   */
import {recipes} from "../JS/dataRecipes.js";
import { displayRecipes } from"../JS/displayRecipes.js";


const searchBar = document.getElementById("input");

searchBar.addEventListener("keyup", (e) => {

    const searchString = normalizeValues(e.target.value);

    const filtredRecipes = recipes.filter(recipe => {

        const ustensilNormalized = recipe.ustensils.map(x => normalizeValues(x));

        const ingredientsNormalized = recipe.ingredients.filter( y => normalizeValues(y.ingredient).includes(searchString) );
    
        return normalizeValues(recipe.name).includes(searchString) ||
               normalizeValues(recipe.description).includes(searchString) ||
               normalizeValues(recipe.appliance).includes(searchString) ||
               ustensilNormalized.includes(searchString)  || 
               ingredientsNormalized.length > 0          
    })

    if(searchString.length > 2 && filtredRecipes.length > 0) {        //l'input fait plus de 2 lettres et au moins une recette correspond au filtrage
        let t0 = performance.now();

        document.getElementById("recipes-page").innerHTML = "";
        const recipesToDisplay = new displayRecipes()
        recipesToDisplay.addRecipeToMainPage(filtredRecipes);

        let t1 = performance.now();
        //console.log( t1 - t0 + " milliseconds");
        //console.log("Ici c'est l'algo 1");

    }else if(e.key === "Backspace" && searchString.length < 3 || searchString.length < 3) { // l'utilisateur utilise delete et l'input fait moins de 3 lettres 
         
        document.getElementById("recipes-page").innerHTML = "";
        const recipesToDisplay = new displayRecipes();
        recipesToDisplay.addRecipeToMainPage(recipes);
        closeAllTags();

    }else if(filtredRecipes.length === 0){                          // si il n'y a aucune recette qui correspond on affiche un mssg d'erreur

        document.getElementById("recipes-page").innerHTML = `
        <div class="erreur">
        <p> Oups...<br>Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc..." </p>
        </div>
        `
    } 
}); 

const normalizeValues = (value) => {
    return value
      .normalize("NFD") //décomposer les graphèmes combinés en simple
      .replace(/[\u0300-\u036f]/g, "") //enlever les signes diacritiques
      .toLowerCase()
      .trim();
};
const sortByAlphabeticsOrder = (array) => {
    array = array.sort((a, b) => {
      return a > b ? 1 : -1;
    });
};

function closeAllTags(){
    const erase = document.querySelectorAll(".fa-times-circle");
    erase.forEach(anni => {
        anni.click(); // j'appelle la fonction qui ferme le tag et efface le bouton 
    })
}

///////////////////////////////////                                           DROPDOWN MENUS                       /////////////////////////////////////////////////////////

const dropDown1 = document.getElementById("dropdown-menus-1")
const listDropDown1 = document.getElementById("dropdown-menus-1-open");

const dropDown2 = document.getElementById("dropdown-menus-2")
const listDropDown2 = document.getElementById("dropdown-menus-2-open");

const dropDown3 = document.getElementById("dropdown-menus-3")
const listDropDown3 = document.getElementById("dropdown-menus-3-open");
                                                        

dropDown1.addEventListener("click", launchDropDown1);

function launchDropDown1() {
    listDropDown1.style.display = "block";
    dropDown1.style.display = "none";
    closeDropDown2();
    closeDropDown3();
}
function closeDropDown1(){
    listDropDown1.style.display = "none";
    dropDown1.style.display = "flex"; 
}


dropDown2.addEventListener("click", launchDropDown2);

function launchDropDown2() {
    listDropDown2.style.display = "block";
    dropDown2.style.display = "none";
    closeDropDown1();
    closeDropDown3();
}
function closeDropDown2(){
    listDropDown2.style.display = "none";
    dropDown2.style.display = "flex"; 
}


dropDown3.addEventListener("click", launchDropDown3);
                                                       
function launchDropDown3() {
    listDropDown3.style.display = "block";
    dropDown3.style.display = "none";
    closeDropDown1();
    closeDropDown2();
}
function closeDropDown3(){
    listDropDown3.style.display = "none";
    dropDown3.style.display = "flex"; 
}


document.addEventListener("click", (e) => { 

    if (e.target.closest("#dropdown-menus") == null) {     //si le click renvoit autre chose que dropdown-menus on ferme toutes les listes
        closeDropDown1();
        closeDropDown2();
        closeDropDown3();
    }
});

// REMPLIS LES LISTES DE MENUS DROPDOWN   

let arrayIngredients =[];
let arrayAppareils =[];
let arrayUstensils =[];

// On remplit le menu dropdown1 = les ingredients 
const ingredientArray = recipes.forEach(elemento => {
    elemento.ingredients.forEach(z => {
        
        if(!arrayIngredients.includes(z.ingredient)){
           arrayIngredients.push(z.ingredient);
           sortByAlphabeticsOrder(arrayIngredients);
       }
    })
})

listDropDown1.innerHTML = 
`
<div class="drop_ingredients">
 <input  type="search" class="fleche" placeholder="Rechercher un ingredient">

 <i id="chevron_up" class="fas fa-chevron-up up1"></i>

 <ul class="ustensils_list_filtred ingbyinput">${arrayIngredients.map((vu) => `<li class="ing ${normalizeValues(vu).replace(/ /g, '-')}"> ${vu} </li>`).join("")}</ul>

</div>
`;

// On remplit le menu dropdown2 = les appareils , appliances
recipes.forEach(elementa => {
    
    if(!arrayAppareils.includes(elementa.appliance)){

        arrayAppareils.push(elementa.appliance);
        sortByAlphabeticsOrder(arrayAppareils);
    }
})

listDropDown2.innerHTML = 
`
<div class="drop_appareils">
 <input  type="search" class="fleche" placeholder="Rechercher un appareil">

 <i id="chevron_up" class="fas fa-chevron-up up2"></i>

 <ul class="ustensils_list_filtred appbyinput">${arrayAppareils.map((vu) => `<li class="app ${normalizeValues(vu).replace(/ /g, '-')}"> ${vu} </li>`).join("")}</ul>

</div>
`;

// On remplit le dropdown3 avec les ustensils 
function InitdropUstensil(){
    recipes.forEach(elementy => {
        elementy.ustensils.forEach(v => {
        
        if(!arrayUstensils.includes(v)){
    
            arrayUstensils.push(v);
            sortByAlphabeticsOrder(arrayUstensils);
        }
        })
    })
}  
InitdropUstensil();
    

listDropDown3.innerHTML =   
`
<div class="drop_ustensils">
 <input type="search" class="fleche" placeholder="Rechercher un ustensil">

 <i id="chevron_up" class="fas fa-chevron-up up3"></i>

 <ul class="ustensils_list_filtred ustbyinput">${arrayUstensils.map((vu) => `<li class="ust ${normalizeValues(vu).replace(/ /g, '-')}"> ${vu} </li>`).join("")}</ul>

</div>
`;

// Fermer les listes dropdown avec les chevrons 
const chevron1 = document.querySelector(".fa-chevron-up.up1");   
chevron1.addEventListener("click", closeDropDown1);

const chevron2 = document.querySelector(".fa-chevron-up.up2"); 
chevron2.addEventListener("click", closeDropDown2);

const chevron3 = document.querySelector(".fa-chevron-up.up3"); 
chevron3.addEventListener("click", closeDropDown3);

export {arrayIngredients,arrayAppareils, arrayUstensils, normalizeValues };

