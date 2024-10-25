// Scripts for handeling the ham button 

const hamButton = document.querySelector('#ham-menu');
const navMenu = document.querySelector('.menu');


hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('open');
    navMenu.classList.toggle('open');
})




const fetchingData = async () => {
    const mealsData = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    const meals = await mealsData.json();

    console.log(meals.meals);
    return meals.meals
}



const mealName = document.querySelector('#title');
const mealImg = document.querySelector('#meal-image');

const showinMeal = async () => {
    const mealData = await fetchingData();

    mealName.textContent = mealData[0].strMeal;
    mealImg.setAttribute('src', `${mealData[0].strMealThumb}`)

}

showinMeal()