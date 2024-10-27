

export const myRecipiesContent = async () => {

    const SaveRecipies = () => {
        const ingredients = [];

        function saveRecipeToLocal(recipie) {
            const recipies = JSON.parse(localStorage.getItem('recipies')) || [];
            recipies.push(recipie);
            localStorage.setItem('recipies', JSON.stringify(recipies));
        }
    
        document.getElementById('addIngredient').addEventListener('click', () => {
            const ingredientInput = document.getElementById('ingredient');
            const ingredient = ingredientInput.value.trim();
        
            if (ingredient) {
                ingredients.push(ingredient);
        
                const ingredientList = document.getElementById('ingredientList');
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                ingredientList.appendChild(listItem);
        
     
                ingredientInput.value = '';
               

            } else {
                alert("Please enter a valid ingredient.");
            }
        });


        
        document.getElementById('recipeForm').addEventListener('submit', (event) => {
            event.preventDefault();
        
            const recipe = {
                name: document.getElementById('recipeName').value,
                ingredients: ingredients, 
                instructions: document.getElementById('instructions').value,
            };
        
    
            saveRecipeToLocal(recipe);
            alert('Recipies Saved Succesfully!')
        
        
            event.target.reset();
            ingredients.length = 0; 
            document.getElementById('ingredientList').innerHTML = '';
            location.reload(false);
            
        });
        
    }

    SaveRecipies();

    const displayRecipies = () => {

        const cardPlaceHolder = document.querySelector('#new-recipie');
        const recipies = JSON.parse(localStorage.getItem('recipies')) || [];
        const recipiesContainer = document.querySelector('#recipies-container');

        recipies.forEach((recipie, index) => {

            if(!cardPlaceHolder.classList.contains('new-recipie')  && recipiesContainer.children.length >= 1){
                cardPlaceHolder.classList.add('new-recipie')
            }

            const article = document.createElement('article');

            article.dataset.id = index;
            article.classList.add('explore-card', 'myrecipies-card')
            article.innerHTML = `
                    <h2 class="explore-card-content">${recipie.name}</h2>
            `
            article.addEventListener('click', () => {
                const articleId = article.dataset.id;

                displayMyRecipie(articleId, recipies);
            })



            recipiesContainer.appendChild(article);
        });        
    }

    displayRecipies();


    const displayMyRecipie = (mealIndex, recipiesData) => {
        const { name, ingredients, instructions } = recipiesData[mealIndex];
        const mealDetailsModal = document.querySelector('#meal-details-modal');
    
       
        const ingredientListHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    
        mealDetailsModal.innerHTML = `
            <h3>${name}</h3>
            <button id="closeModal">X</button>
            <div class="container modal-container">
                <h4>Ingredients</h4>
                <ul class="ul-li-styled">${ingredientListHTML}</ul>
                <h4>Instructions</h4>
                <p class="instructions">${instructions}</p>
                <button id="deleteRecipe" class="button delete-button">Delete Recipe</button>
            </div>
        `;
    
    
        mealDetailsModal.showModal();

        document.querySelector('#closeModal').addEventListener('click', () => {
            mealDetailsModal.close();
        });

        document.querySelector('#deleteRecipe').addEventListener('click', () => {
            deleteRecipe(mealIndex);
            mealDetailsModal.close();
        });

        const deleteRecipe = (index) => {
            const recipies = JSON.parse(localStorage.getItem('recipies')) || [];
            recipies.splice(index, 1); 
            localStorage.setItem('recipies', JSON.stringify(recipies)); 
            location.reload(false)
        };
    }
}
