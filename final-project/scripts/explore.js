import { fetchCategories, filterByCategory } from "./fetching-data.js";

const showLoadingScreen = () => {
    document.getElementById('loading-screen').style.display = 'flex';
};

const hideLoadingScreen = () => {
    document.getElementById('loading-screen').style.display = 'none';
};


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
   

        // const preloadImage = (src) => { //Preloading the LCP in order to improve the performance
        //     const link = document.createElement('link');
        //     link.rel = 'preload';
        //     link.href = src;
        //     link.as = 'image';
        //     document.head.appendChild(link);
        // };
    
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
                const categoryId = article.dataset.id;
                console.log(categoryId)
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
