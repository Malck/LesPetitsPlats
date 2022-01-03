// tableau vide array[]= ""
/*  on va chercher l input tapé et on trie avec un filter nos recipes pour garder celle qui sont correspondantes */


class MainSearchFactory {
    constructor(input, articles) {
      this.input = input;
      this.articles = articles;
      this.searchWithInput(this.input, this.articles);
    }


searchWithInput(input, articles)  {
    

input.addEventListener("keyup", (e) => {
    
    console.log(input);

    if (input.value.length > 2) {
        research(articles, input);
    }
});

}

} // fin mainSearchFactory

const research = (articles, input) => {
    let restArticles = [];
    restArticles.splice(0, restArticles.length);
    console.log(restArticles);
  
    //let errorMessage = document.querySelector("#error-message");
  
    if (errorMessage) errorMessage.remove();
  
    refreshRecipes(articles, restArticles, input.value);
  
    if (restArticles.length < 1) {
      displayErrorMessage();
    }
};


const refreshRecipes = (articles, restArticles, input) => {
    
    searchAlgo1(articles, input);
    returnDisplayedArticles(restArticles, articles);
    
};

const returnDisplayedArticles = (restArticles, articles) => {
    articles.forEach((article) => {
      if (article.className !== "recipe hidden") {
        restArticles.push(article);
      }
    });
  };


const searchAlgo1 = (articles, input) => {
    articles.forEach((article) => {
      let articleFooter = article.firstChild.nextElementSibling.nextElementSibling;
      let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
      let inputValueNorm = normalizeValues(input);
  
      if (!footerValuesNorm.includes(inputValueNorm)) {
        article.classList.add("hidden");
      }
    });
};
  
// Le message d'erreur quand le tableau des recettes est vide
const displayErrorMessage = () => {
    let container = document.querySelector("#dropdown-menus");
    container.insertAdjacentHTML(
      "afterend",
      `
          <p id = "error-message" >Oups...<br>Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`
    );
};


// Fonction pour faire la comparaison entre input et les recettes
const normalizeValues = (value) => {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

export { MainSearchFactory, research };