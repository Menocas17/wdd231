import { exploreContent } from "./explore.js";
import { myRecipiesContent } from "./myrecipies.js";
import { searchMeal } from "./search.js";


// Scripts for handeling the ham button 

const hamButton = document.querySelector('#ham-menu');
const navMenu = document.querySelector('.menu');


hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('open');
    navMenu.classList.toggle('open');
})

if (document.body.id === 'explore-page'){
    exploreContent();
}

if (document.body.id === 'myrecipies-page') {
    myRecipiesContent();
}

if(document.body.id === 'search-page') {
    searchMeal();
}



