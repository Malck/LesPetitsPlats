//import {recipes} from "../JS/dataRecipes.js";

class displayRecipes {
    constructor() {
      this.recipesPage = document.querySelector("#recipes-page");
    }

    addRecipeToMainPage(handleRecipes) {
        handleRecipes.map((recipe) => {
          this.addElements(recipe);
        });
    }

    createRecipeElement(recipe, ingredientinfos) {
        this.recipesPage.insertAdjacentHTML(
          // 'beforeBegin', 'afterBegin', 'beforeEnd', or 'afterEnd'
          "beforeEnd",
          `
            <article tabIndex="${recipe.id}" class="recipe">
                   
                <img class = 'picture' src = "IMG/${recipe.name}.jpg">
                  
                <footer class="recipe--information">

                    <h1 class="recipe--information_name">${recipe.name}</h1>
                    <h2 class="recipe--information_time"><i class="far fa-clock"></i> ${recipe.time} min</h2>

                    <div class="recipe--information--text">
                        <ul class="recipe--information--text_list"> ${ingredientinfos}</ul>
                        <p class="recipe--information--text_instructions">${recipe.description}</p>
                        <p class="ustensils" style = 'display : none'> ${recipe.appliance} ${recipe.ustensils} </p>
                    </div>

                </footer>
            </article>
            `
        );
    }

    addElements(recipe) {
        let ingredientinfos = "";

        recipe.ingredients.forEach((ingredientX) => {

            if (ingredientX.quantity) {

                if (ingredientX.unit && ingredientX.quantity) {
                ingredientinfos += `<li><strong class = 'ingredient'>${ingredientX.ingredient}</strong> : ${ingredientX.quantity} ${ingredientX.unit}</li>`;
                } else {
                ingredientinfos += `<li><strong class = 'ingredient'>${ingredientX.ingredient}</strong> : ${ingredientX.quantity}</li>`;
                }
            } else {
                ingredientinfos += `<li><strong class = 'ingredient'>${ingredientX.ingredient}</strong></li>`;
            }
        });

        return this.createRecipeElement(recipe, ingredientinfos);
    }
   
    


} // Fin de la class displayRecipes

export { displayRecipes };


