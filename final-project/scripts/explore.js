import { fetchCategories, filterByCategory } from "./fetching-data.js";


export const exploreContent = async () => { // This function will display all the categories when the user goes to the explore page

    const exploreSection = document.querySelector('#explore-content'); 
    const fragment = document.createDocumentFragment();


    const categories = await fetchCategories();

    const preloadImage = (src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    };

    preloadImage(categories[0].strCategoryThumb);
    

    categories.forEach(category => {
        let article = document.createElement('article');
        let mealTitle = document.createElement('h2');

        article.appendChild(mealTitle);

        article.classList.add('explore-card');
        mealTitle.classList.add('explore-card-content');

        article.style.setProperty('--bg-image', `url(${category.strCategoryThumb})`)
        mealTitle.textContent = category.strCategory;

        fragment.appendChild(article);
    });

    exploreSection.appendChild(fragment);
}

