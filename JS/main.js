import {recipes} from "../JS/dataRecipes.js";

import { displayRecipes } from "./displayRecipes.js";

const recipesToDisplay = new displayRecipes();

recipesToDisplay.addRecipeToMainPage(recipes);
