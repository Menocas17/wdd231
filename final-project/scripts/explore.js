import { fetchCategories, filterByCategory, fetchingMeal } from "./fetching-data.js";

const showLoadingScreen = () => {
    document.getElementById('loading-screen').style.display = 'flex';
};

const hideLoadingScreen = () => {
    document.getElementById('loading-screen').style.display = 'none';
};


export const displayMealDetails = async (idMeal) => {
    const mealModal = document.querySelector('#meal-details-modal');
    const mealData = await fetchingMeal(idMeal);

    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        const measure = mealData[`strMeasure${i}`];


        if (ingredient) {
            ingredients.push(ingredient);
            measures.push(measure || ''); 
        }
    }

    const ingredientsList = ingredients.map((ingredient, index) => {
        return `<li>${measures[index]} ${ingredient}</li>`;
    }).join('');


    let iframeContent = '';
    if (mealData.strYoutube) {
    
        const videoId = mealData.strYoutube.split('v=')[1].split('&')[0];
        
       
        iframeContent = `
            <iframe class = "iframe" width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
        `;
    } else {
        
        iframeContent = `<p class="iframe">Este platillo no tiene video disponible.</p>`;
    }

    mealModal.innerHTML = `


        <h3>${mealData.strMeal}</h3>
        <button id="closeModal">X</button>

        
        <img src="${mealData.strMealThumb}" class="box-shadow" loading="lazy" width="350" height="350">

        <div class="container modal-container">
            <h4>Ingredients</h4>
            <ul class="ul-li-styled">
                ${ingredientsList}
            </ul>
            <h4>Instructions</h4>
            <p class="instructions">${mealData.strInstructions}</p>
            <h4>Video Tutorial</h4>
            ${iframeContent}
            <a class="button button-link btn-modal" href="${mealData.strSource}">Nutritional Info</a>
        </div>
        

    `

    mealModal.showModal();

    document.querySelector('#closeModal').addEventListener('click', () => {
        mealModal.close();
    });

}


export const exploreContent = async () => { // This function will display all the categories when the user goes to the explore page

    const exploreSection = document.querySelector('#explore-content'); 
    const btnExplore = document.querySelector('.btn-explore');
    const categoryTitle = document.querySelector('#explore-title');
    let fragment = document.createDocumentFragment();


    const preloadImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(); // Resolve when the image is loaded
            img.onerror = () => resolve(); // Resolve even on error to prevent hanging
        });
    };


    const displayAllCategories = async () => {
     
        showLoadingScreen();
        const categories = await fetchCategories();
       
        const preloadPromises = categories.map(category => preloadImage(category.strCategoryThumb));

        await Promise.all(preloadPromises);
        hideLoadingScreen();

        categories.forEach(category => { // Adding the categories cards to the DOM
            let article = document.createElement('article');
            let mealTitle = document.createElement('h2');
           
    
            article.appendChild(mealTitle);
    
            article.classList.add('explore-card');
            mealTitle.classList.add('explore-card-content');
            article.dataset.name = category.strCategory;
            article.addEventListener('click', ()=> {
                const categoryName = article.dataset.name;
                exploreSection.innerHTML = '';
                btnExplore.classList.toggle('btn-explore-show')
                categoryTitle.textContent = categoryName;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                displayFilteredCategory(categoryName);
            
            })
    
            article.style.setProperty('--bg-image', `url(${category.strCategoryThumb})`)
            mealTitle.textContent = category.strCategory;
         
    
            fragment.appendChild(article);
        });

        exploreSection.appendChild(fragment);

      
    }
   
    
    btnExplore.addEventListener('click', () => {
        location.reload(false);
    })

    const displayFilteredCategory = async (categoryName) => {

        
        showLoadingScreen();
        const filteredMeals = await filterByCategory(categoryName);

        const preloadPromises = filteredMeals.map(meal => preloadImage(meal.strMealThumb));

        await Promise.all(preloadPromises);
        hideLoadingScreen();

        filteredMeals.forEach(meal => { 
            let article = document.createElement('article');
            let mealTitle = document.createElement('h2');
           
    
            article.appendChild(mealTitle);
    
            article.classList.add('explore-card');
            mealTitle.classList.add('explore-card-content');
            article.dataset.id = meal.idMeal;
            article.addEventListener('click', ()=> {
                const mealId = article.dataset.id;
                displayMealDetails(mealId)
            })
    
            article.style.setProperty('--bg-image', `url(${meal.strMealThumb})`)
            mealTitle.textContent = meal.strMeal;
         
            
            fragment.appendChild(article);
        });
    
        exploreSection.appendChild(fragment);
        exploreSection.classList.toggle('min-height');

    }

    displayAllCategories();




};
