import {recipes} from "../JS/dataRecipes.js";

import {arrayIngredients,arrayAppareils, arrayUstensils, normalizeValues } from"../JS/algo2.js";

//Barre de recherche Ingredients
const searchBarIngredient = document.querySelector(".drop_ingredients input");

searchBarIngredient.addEventListener("keyup", (e) => { 

    const searchStringI = normalizeValues(e.target.value);
    
    const filtredIngredient = arrayIngredients.filter(ingen => {

        return normalizeValues(ingen).includes(searchStringI);       
    })

    const ingredientsbyinput = document.querySelector(".ingbyinput");
    ingredientsbyinput.innerHTML = ""

    filtredIngredient.forEach(ingenfiltre => {

        let ingenfiltreNorm = normalizeValues(ingenfiltre).replace(/ /g, '-');
        let classHiddeni = document.querySelector(`#tagselect i[data-origin='${ingenfiltreNorm}']`) ? "hidden" : ""

        ingredientsbyinput.innerHTML += `<li class="ing ${ingenfiltreNorm} ${classHiddeni}"> ${ingenfiltre} </li>`

    })
    selectTagIngredient();
});

let arrayTagIngredient = []

function selectTagIngredient() {                                  

    const ingTag = document.querySelectorAll(".ing")
    
    const TagSelectDiv = document.querySelector(".choosenTag");
    
    ingTag.forEach(function (ing) {

        ing.addEventListener("click",(e) => {
           
            if(!e.target.classList.contains("hidden")) {
                e.target.classList.add("hidden");

                arrayTagIngredient.push(normalizeValues(e.target.innerHTML).replace(/ /g, '-')); // j'ai rejouté normaliseValues directement 
                
                TagSelectDiv.insertAdjacentHTML(
                 "beforeEnd",
                 `
                 <button class="" style="background-color: rgb(50, 130, 247);"> 
                 <p> ${e.target.innerHTML} </p>
                 <i class="far fa-times-circle" data-origin="${normalizeValues(e.target.innerHTML).replace(/ /g, '-')}"></i>
                 </button>
                 `
                );
                closeTags();
                filtreTags();
            }                
        })
    }) 
}
selectTagIngredient();
                                
//Barre de recherche Appareils = appliance 
const searchBarAppareil = document.querySelector(".drop_appareils input");

searchBarAppareil.addEventListener("keyup", (e) => { 

    const searchStringA = normalizeValues(e.target.value);
    
    const filtredAppareil = arrayAppareils.filter(appen => {

        return normalizeValues(appen).includes(searchStringA)       
    })

    const appareilsbyinput = document.querySelector(".appbyinput");
    appareilsbyinput.innerHTML = ""

    filtredAppareil.forEach(appenfiltre => {

        let appenfiltreNorm = normalizeValues(appenfiltre).replace(/ /g, '-');
        let classHiddena = document.querySelector(`#tagselect i[data-origin='${appenfiltreNorm}']`) ? "hidden" : ""

        appareilsbyinput.innerHTML += `<li class="app ${appenfiltreNorm} ${classHiddena}"> ${appenfiltre} </li>`
    })
    selectTagAppareil();
});

let arrayTagAppareil = []

function selectTagAppareil() {                                  

    const appaTag = document.querySelectorAll(".app")
    
    const TagSelectDiv = document.querySelector(".choosenTag");
    
    appaTag.forEach(function (ap) {

        ap.addEventListener("click",(e) => {
    
            if(!e.target.classList.contains("hidden")) {
                e.target.classList.add("hidden");

                arrayTagAppareil.push(normalizeValues(e.target.innerHTML).replace(/ /g, '-')); // j'ai rejouté normaliseValues directement donc l123 le tagInArray n'est plus utile 
                
                TagSelectDiv.insertAdjacentHTML(
                 "beforeEnd",
                 `
                 <button class="" style="background-color: rgb(104, 217, 164);"> 
                 <p> ${e.target.innerHTML} </p>
                 <i class="far fa-times-circle" data-origin="${normalizeValues(e.target.innerHTML).replace(/ /g, '-')}"></i>
                 </button>
                 `
                );
                closeTags();
                filtreTags();
            }                
        })
    }) 
}
selectTagAppareil();

//Barre de recherche Ustensiles
const searchBarUstensil = document.querySelector(".drop_ustensils input");

searchBarUstensil.addEventListener("keyup", (e) => { 

    const searchStringU = normalizeValues(e.target.value);

    const filtredUstensils = arrayUstensils.filter(usten => {
    
        return normalizeValues(usten).includes(searchStringU)       
    })
    
    const ustensilsbyinput = document.querySelector(".ustbyinput");
    ustensilsbyinput.innerHTML = ""
    
    filtredUstensils.forEach(ustenfiltre => {

        let ustenfiltreNorm = normalizeValues(ustenfiltre).replace(/ /g, '-');
        let classHidden = document.querySelector(`#tagselect i[data-origin='${ustenfiltreNorm}']`) ? "hidden" : ""
    
        ustensilsbyinput.innerHTML += `<li class="ust ${ustenfiltreNorm} ${classHidden}"> ${ustenfiltre} </li>`
        
    })

    selectTagUstensil();  // important d'avoir la fonction ici pour cliquer sur un ustensil apres qu'ils aient été filtrés par la recherche
});

let arrayTagUstensil = []

function selectTagUstensil() {                                  

    const ustTag = document.querySelectorAll(".ust")
    
    const TagSelectDiv = document.querySelector(".choosenTag");
    
    ustTag.forEach(function (a) {

        a.addEventListener("click",(e) => {
            
            if(!e.target.classList.contains("hidden")) {
                e.target.classList.add("hidden");

                arrayTagUstensil.push(normalizeValues(e.target.innerHTML).replace(/ /g, '-'));  
                
                TagSelectDiv.insertAdjacentHTML(
                 "beforeEnd",
                 `
                 <button class="" style="background-color: rgb(237, 100, 84);"> 
                 <p> ${e.target.innerHTML} </p>
                 <i class="far fa-times-circle" data-origin="${normalizeValues(e.target.innerHTML).replace(/ /g, '-')}"></i>
                 </button>
                 `
                );
                closeTags();
                filtreTags();
            }                
        })
    }) 
}
selectTagUstensil();


function filtreTags(){          // Fonction principal: filtrer les recettes affichés , cacher celles qui ne contiennent pas la value du Tag 
    
    recipes.forEach(recipe => {

        const ingredientsNormalized = recipe.ingredients.map( y => normalizeValues(y.ingredient).replace(/ /g, '-'));
        const tagInArrayI = arrayTagIngredient.map(i => normalizeValues(i));
        
        const appareilNormalized = normalizeValues(recipe.appliance).replace(/ /g, '-');
        const tagInArrayApp = arrayTagAppareil.map(u => normalizeValues(u));

        const ustensilNormalized = recipe.ustensils.map(x => normalizeValues(x).replace(/ /g, '-'));      
        const tagInArray = arrayTagUstensil.map(u => normalizeValues(u));

        let isMatchI = tagInArrayI.every( ing => ingredientsNormalized.includes(ing) );
        let isMatchA = tagInArrayApp.every( app => appareilNormalized.includes(app) );
        let isMatchU = tagInArray.every( ai => ustensilNormalized.includes(ai) ); // Si tous les elements du tagInArray sont retrouvé dans les ustensils de la recette
        
        if(document.querySelector(`article[tabindex="${recipe.id}"]`)) {  

            if(isMatchI && isMatchA && isMatchU){           
                
                document.querySelector(`article[tabindex="${recipe.id}"]`).classList.remove("invisible");

            }else{

                document.querySelector(`article[tabindex="${recipe.id}"]`).classList.add("invisible");
            }
        }
    }) 

    if(!document.querySelector("article:not(.invisible)") && (!document.getElementById("erreur")) ) {

        document.getElementById("recipes-page").insertAdjacentHTML(
            "beforeEnd",
         `
            <div id="erreur">
            <p> Oups...<br>Votre recherche ne correspond à aucun résultat..." </p>
            </div>
            `
        )    
    }else if(!document.querySelector("article:not(.invisible)") ) {
        //console.log("op");
    }else{
        if(document.getElementById("erreur")){

            document.getElementById("erreur").remove();
        }
    }
}


function closeTags() {     // Ici il faudrait que le tag disparaisse de la divTag et relance les recettes affichées donc filtreTags
    const crossClose = document.querySelectorAll(".choosenTag i")
    
    crossClose.forEach(c => {
        c.addEventListener("click", (event) => {
            
            event.target.parentNode.remove(); //Supprime en entier le bouton du tag

            const dropMenusTest = document.getElementById("dropdown-menus");
            dropMenusTest.querySelector(`.${event.target.getAttribute('data-origin')}`).classList.remove("hidden");

            const dataOrigin = event.target.getAttribute('data-origin');

            const index = arrayTagIngredient.indexOf(dataOrigin);
            const indexu = arrayTagUstensil.indexOf(dataOrigin);
            const indexa = arrayTagAppareil.indexOf(dataOrigin);
            
            if(index > -1){
                arrayTagIngredient.splice(index, 1);

            }else if(indexu > -1 ){
                arrayTagUstensil.splice(indexu, 1);

            }else if(indexa > -1){
                arrayTagAppareil.splice(indexa, 1);
            }
            filtreTags(); 
        })
    })
    
}
closeTags(); 






