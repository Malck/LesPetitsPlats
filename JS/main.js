import {recipes} from "../JS/dataRecipes.js";

import { displayRecipes } from "./displayRecipes.js";

console.log(recipes);
const recipesToDisplay = new displayRecipes();

recipesToDisplay.addRecipeToMainPage(recipes);





 /* async function GetDataRecipes() {
    const url = 'dataRecipes.js';
    const response = await fetch(url) ; 
    const data = await response.json();
    //displayRecipes(data)
    console.log(data);
}

GetDataRecipes()   */