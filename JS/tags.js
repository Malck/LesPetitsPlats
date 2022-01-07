import {recipes} from "../JS/dataRecipes.js";
import { displayRecipes } from"../JS/displayRecipes.js";
import {arrayIngredients,arrayAppareils, arrayUstensils, normalizeValues } from"../JS/algo.js";

//Barre de recherche Ingredients
const searchBarIngredient = document.querySelector(".drop_ingredients input");

searchBarIngredient.addEventListener("keyup", (e) => { 

    const searchStringI = normalizeValues(e.target.value);
    
    const filtredIngredient = arrayIngredients.filter(ingen => {

        return normalizeValues(ingen).includes(searchStringI)       
    })

    const ingredientsbyinput = document.querySelector(".ingbyinput");
    ingredientsbyinput.innerHTML = ""
    console.log(ingredientsbyinput);

    filtredIngredient.forEach(ingenfiltre => {

        ingredientsbyinput.innerHTML += `<li class="ust ${ingenfiltre}"> ${ingenfiltre} </li>`
    })

});
                                
//Barre de recherche Appareils = appliance 
const searchBarAppareil = document.querySelector(".drop_appareils input");

searchBarAppareil.addEventListener("keyup", (e) => { 

    const searchStringA = normalizeValues(e.target.value);
    
    const filtredAppareil = arrayAppareils.filter(appen => {

        return normalizeValues(appen).includes(searchStringA)       
    })

    const appareilsbyinput = document.querySelector(".appbyinput");
    appareilsbyinput.innerHTML = ""
    console.log(appareilsbyinput);

    filtredAppareil.forEach(appenfiltre => {

        appareilsbyinput.innerHTML += `<li class="ust ${appenfiltre}"> ${appenfiltre} </li>`
    })

});

//Barre de recherche Ustensiles
const searchBarUstensil = document.querySelector(".drop_ustensils input");

searchBarUstensil.addEventListener("keyup", (e) => { 

    const searchStringU = normalizeValues(e.target.value);

    const filtredUstensils = arrayUstensils.filter(usten => {
    
        return normalizeValues(usten).includes(searchStringU)       
    })
    
    const ustensilsbyinput = document.querySelector(".ustbyinput");
    ustensilsbyinput.innerHTML = ""
    console.log(ustensilsbyinput);
    
    filtredUstensils.forEach(ustenfiltre => {
    
        ustensilsbyinput.innerHTML += `<li class="ust ${ustenfiltre}"> ${ustenfiltre} </li>`
    })
    console.log(filtredUstensils);

    selectTagUstensil();  // important d'avoir la fonction ici pour cliquer sur un ustensil apres qu'ils aient été filtré par la recherche

});


let arrayTagUstensil = []
// Selectionné un tag 
function selectTagUstensil() {                                  

    const ustTag = document.querySelectorAll(".ust")
    console.log(ustTag);
    const TagSelectDiv = document.querySelector(".choosenTag");
    
    ustTag.forEach(function (a) {

        a.addEventListener("click",(e) => {
            //console.log(e.target)
            if(!e.target.classList.contains("hidden")) {
                e.target.classList.add("hidden");

                arrayTagUstensil.push(normalizeValues(e.target.innerHTML)); // j'ai rejouté normaliseValues directement donc l123 le tagInArray n'est plus utile 
                console.log(arrayTagUstensil);
                
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
                filtreTagsUst();
                //recipeFiltreTag();
             
            }                //else if(RECETTEAFICHé.includes(TagString))
        })
    }) 
}
selectTagUstensil();

function filtreTagsUst(){                  // ICI j'aimerai filtrer les recettes affichés , cachés celles qui ne contiennent pas la value du Tag 
    console.log("lance filtreTagsTest")
    
    recipes.forEach(recipe => {

        const ustensilNormalized = recipe.ustensils.map(x => normalizeValues(x));
        console.log(ustensilNormalized);

        const tagInArray = arrayTagUstensil.map(u => normalizeValues(u));
        console.log(tagInArray);
        

        //console.log(document.querySelector(`article[tabindex="${recipe.id}"]`)) ;

        if(document.querySelector(`article[tabindex="${recipe.id}"]`)) {
                                                                                      // ustensilnormalized et taginArray ont le meme ustensil mais la console me lance le NOPE 
            if(ustensilNormalized.includes(tagInArray.length)){             
                console.log("MATCH");
                document.querySelector(`article[tabindex="${recipe.id}"]`).classList.remove("invisible");
            }else{
                console.log("NOPE");
                document.querySelector(`article[tabindex="${recipe.id}"]`).classList.add("invisible");
            }
            console.log("/////////////////////////////////")
        }
        /*else if(il n'y a plus de recette affichées){
            document.getElementById("recipes-page").innerHTML = `
        <div class="erreur">
        <p> Oups...<br>Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc..." </p>
        </div>
        `
        }*/
    }) 
    // Parcourir toutes les recettes (forEach sur recipes)
        // if (document.querySelector('article[tabindex="40"]')) {
        // }
        // si l'id de la recette que l'on parcours existe sur la page (document.querySelector('article[tabindex="40"]'))
            // je fais les tests sur le tableau des tags ustensils et sur la recette en cours
            // Si le test est ok
                // Je supprime la class invisible sur document.querySelector('article[tabindex="40"]')
            // Sinon
                // j'ajoute la class invisible sur document.querySelector('article[tabindex="40"]')
}

function closeTags() {                                                // Ici il faudrait que le tag disparaisse de la divTag et relance les recettes affichées donc filtreTagsTest
    const crossclose = document.querySelectorAll(".choosenTag i")
    const divTag = document.getElementById("tagselect")
    
    crossclose.forEach(c => {
        c.addEventListener("click", (event) => {
            
            const dropMenusTest = document.getElementById("dropdown-menus");
            
            dropMenusTest.querySelector(`.${event.target.getAttribute('data-origin')}`).classList.remove("hidden");

            //enlever le tag du tableau arrayTagUstensil
            console.log(event.target.getAttribute('data-origin'));
            //arrayTagUstensil.remove(event.target.getAttribute('data-origin'));
            console.log(arrayTagUstensil);

            //console.log(event.target.parentNode)
            event.target.parentNode.remove();  
        })
        //appeller la fonction filtretagsTest pour enlever la class invisible a la recette quand on ferme un tag 
        //filtreTagsUst();
    })
}
//closeTags(); 






