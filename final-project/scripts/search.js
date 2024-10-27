import { filterByMainIngridient } from "./fetching-data.js";
import { displayMealDetails } from "./explore.js";

export const searchMeal = async () => {
    const searchBar = document.querySelector('#search-bar');
    const searchButton = document.querySelector('#search-button');
    const recipiesContainer = document.querySelector('#recipies-container');
    const searchMain = document.querySelector('#search-main');
    let fragment = document.createDocumentFragment();

    const performSearch = async () => {
        recipiesContainer.innerHTML = '';
        const ingredientName = searchBar.value.trim();

        if (!ingredientName) {
            alert("Please, enter a valid ingredient."); 
            return;
        }

        const mealsData = await filterByMainIngridient(ingredientName);

       
        const existingNotResults = document.querySelector('.recipies-not-found');
        if (existingNotResults) {
            existingNotResults.remove();
        }

        if (!Array.isArray(mealsData) || mealsData.length === 0) {

            if(recipiesContainer.classList.contains('recipies-container-search-show')) {
                recipiesContainer.classList.remove('recipies-container-search-show')
            }
        
            const notResults = document.createElement('div');
            notResults.classList.add('container');
            notResults.innerHTML = `
                <div class="recipies-not-found">
                    <img src="./images/search-images/noresults.webp">
                    <p>Sorry! We could not find any recipe with that name, please try again!</p>
                </div>
            `;
            searchMain.appendChild(notResults);
            return;
           
        } else {
          
            recipiesContainer.innerHTML = '';
            mealsData.forEach(meal => { 
                let article = document.createElement('article');
                let mealTitle = document.createElement('h2');

                article.appendChild(mealTitle);
                article.classList.add('explore-card');
                mealTitle.classList.add('explore-card-content');
                article.dataset.id = meal.idMeal;

                article.addEventListener('click', () => {
                    const mealId = article.dataset.id;
                    displayMealDetails(mealId);
                });

                article.style.setProperty('--bg-image', `url(${meal.strMealThumb}`);
                mealTitle.textContent = meal.strMeal;

                fragment.appendChild(article);
            });

            recipiesContainer.classList.add('recipies-container-search-show');
            recipiesContainer.appendChild(fragment);
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchBar.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            performSearch();
        }
    })
}