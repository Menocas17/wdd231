

const imgixBaseUrl = 'https://tastyeats.imgix.net';

// Fetching all the different datas from the API 



export const fetchCategories = async () => {  // Fetching the categories list
    

    

    try {
        const categoriesData = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

        if(!categoriesData.ok) {
            throw new Error (`Response status: ${categoriesData.status}`)
        }

        const categories = await categoriesData.json();

        categories.categories.forEach(img => {
            img.strCategoryThumb = `${imgixBaseUrl}/category/${img.strCategoryThumb.split('/').pop()}?fm=webp`;
        });

        return (categories.categories)

    } catch (error) {
        console.error(error.message)
    }

    
}

export const filterByCategory = async (category) => { // Fetching the meals by category

    try {
        const filteredData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

        if(!filteredData.ok) {
            throw new Error (`Response status: ${filteredData.status}`)
        }

        const filteredCategory = await filteredData.json()

        filteredCategory.meals.forEach(img => {
            img.strMealThumb = `${imgixBaseUrl}/media/meals/${img.strMealThumb.split('/').pop()}?fm=webp`;
        });

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

        meal.meals[0].strMealThumb = `${imgixBaseUrl}/media/meals/${meal.meals[0].strMealThumb.split('/').pop()}?fm=webp`;

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
            throw new Error (`Response status: ${ingridentData.status}`)
        }

        const ingrident = await ingridentData.json()

        if( await ingrident.meals) {
            ingrident.meals.forEach(img => {
                img.strMealThumb = `${imgixBaseUrl}/media/meals/${img.strMealThumb.split('/').pop()}?fm=webp`;
            });
    
        
            return ingrident.meals
        }
    
        else {
            console.warn("No meals found for this ingredient.");
            return []; 
        }

    } catch (error) {
        console.error("Error fetching data", error.message);
        return [];
    }


}

export const filterByName = async (mealName) => { // Fetching the meal by name
    try {
        const mealData = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)

        if(!mealData.ok) {
            throw new Error (`Response status: ${mealData.status}`)
        }

        const mealFound = await mealData.json();

        mealFound.strMealThumb = `${imgixBaseUrl}/media/meals/${mealFound.meals[0].strMealThumb.split('/').pop()}?fm=webp`;
        console.log(mealFound.meals[0])
        return mealFound.meals[0]
        } 
        
        catch (error) {
        console.error(error.message);
    }
} 
