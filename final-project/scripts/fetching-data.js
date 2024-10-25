

// Fetching all the different datas from the API 



export const fetchCategories = async () => {  // Fetching the categories list
    

    

    try {
        const categoriesData = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

        if(!categoriesData.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const categories = await categoriesData.json();

        console.log(categories.categories);

        return (categories.categories)

    } catch (error) {
        console.error(error.message)
    }

    
}

export const filterByCategory = async (category) => { // Fetching the meals by category

    try {
        const filteredData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

        if(!filteredData.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const filteredCategory = await filteredData.json()
        console.log(filteredCategory.meals)

        return filteredCategory.meals

    } catch (error) {
        console.error(error.message);
    }
    
}

export const fetchingMeal = async (idMeal) => { // Fetching the meal details
    try {
        const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);

        if(!mealData.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const meal = await mealData.json()
        console.log(meal.meals[0])
        return meal.meals[0];

    } catch (error) {
        console.error(error.message);
    }
}


export const filterByMainIngridient = async (ingridient) => { // Fetching the meal by main ingridient

    try {
        const ingridentData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridient}`)

        if(!ingridentData.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const ingrident = await ingridentData.json()

        console.log(ingrident.meals)

        return ingrident.meals

    } catch (error) {
        console.error(error.message);
    }


}

export const filterByName = async (mealName) => { // Fetching the meal by name
    try {
        const mealData = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)

        if(!mealData.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const mealFound = await mealData.json();
        console.log(mealFound.meals[0])
        return mealFound.meals[0]
    } catch (error) {
        console.error(error.message);
    }
} 
