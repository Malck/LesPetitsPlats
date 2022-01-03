import {recipes} from "../JS/dataRecipes.js";
import { MainSearchFactory } from "./algo.js";

import { displayRecipes } from "./displayRecipes.js";

new displayRecipes();

new MainSearchFactory();













 /* async function GetDataRecipes() {
    const url = 'dataRecipes.js';
    const response = await fetch(url) ; 
    const data = await response.json();
    //displayRecipes(data)
    console.log(data);
}

GetDataRecipes()   */