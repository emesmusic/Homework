'use strict';
(function () {

    let recipeResultsDiv = document.getElementById('recipe-results');
    const messageDiv = document.createElement('div');
    const backButton = document.querySelector('#back-button');
    messageDiv.classList.add('font-bold', 'mb-2');
    messageDiv.style.textAlign = 'center';



    document.getElementById('search-button').addEventListener('click', async function (e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        if(backButton.classList.contains('hidden') === false) {
            backButton.classList.add('hidden');
        }
        let recipeObject;
        try {
            let recipeData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${document.getElementById('recipe-input').value}`);
            if (!recipeData.ok) {
                throw new Error(`${recipeData.status} - ${recipeData.statusText}`);
            }
            console.log(recipeData);
            recipeObject = await recipeData.json();
            console.log(recipeObject);
        } catch (error) {
            recipeResultsDiv.textContent = `Error: ${error.message}`;
            return;
        }

        if (recipeObject.meals === null || recipeObject.meals.length === 0) {
            displayMessage('No recipes found. Please try another search.');
        }
        else if (recipeObject.meals.length === 1) {
            displayRecipe(recipeObject.meals[0]);
        }
        else if (recipeObject.meals.length > 1) {

            displayMessage('Multiple recipes found. Please select one:');
            const multiResultsDiv = document.createElement('div');
            recipeObject.meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('border', 'p-4', 'mb-4', 'rounded', 'shadow', 'cursor-pointer', 'hover:bg-blue-200', 'active:scale-95', 'transition', 'duration-150', 'ease-in-out', 'hover:scale-99');
                mealDiv.style.display = 'flex';
                mealDiv.style.justifyContent = 'space-between';
                mealDiv.style.alignItems = 'center';
                mealDiv.innerText = `${meal.strMeal}`;
                const recipeImg = document.createElement('img');
                recipeImg.src = meal.strMealThumb;
                recipeImg.alt = `Picture of: ${meal.strMeal}`;
                recipeImg.style.width = '4em';
                recipeImg.classList.add('border', 'rounded');
                mealDiv.appendChild(recipeImg);

                multiResultsDiv.appendChild(mealDiv);

                mealDiv.addEventListener('click', () => displayRecipe(meal, multiResultsDiv));
                recipeResultsDiv.appendChild(multiResultsDiv);
            });
        }
    });


    function displayRecipe(meal, multiResultsDiv = null) {

        if (multiResultsDiv) {
            
            backButton.textContent = 'Back to Results';
            backButton.classList.add('bg-gray-500', 'text-white', 'p-2', 'rounded', 'hover:bg-gray-600', 'active:bg-gray-700', 'active:scale-95', 'transition', 'duration-150', 'cursor-pointer');
            backButton.addEventListener('click', () => {
                recipeResultsDiv.innerHTML = '';
                recipeResultsDiv.appendChild(multiResultsDiv);
                backButton.classList.add('hidden');
            });
            backButton.classList.remove('hidden');
        }



        recipeResultsDiv.innerHTML = '';
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'grid', 'gap-4', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'justify-items-center');
        const titleDiv = document.createElement('div');
        const title = document.createElement('h2');
        title.classList.add('text-2xl', 'font-bold', 'text-center');
        title.textContent = meal.strMeal;
        titleDiv.appendChild(title);
        titleDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full', 'col-start-1', 'flex', 'justify-center', 'items-center');




        const recipeImg = document.createElement('img');
        recipeImg.src = meal.strMealThumb;
        recipeImg.alt = `Picture of: ${meal.strMeal}`;
        recipeImg.style.width = '100%';
        recipeImg.classList.add('border', 'rounded', 'cursor-pointer');
        recipeImg.addEventListener('click', () => {
            window.open(recipeImg.src, '_blank');
        });
        const ingredientsDiv = document.createElement('div');
        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('list-disc', 'list-inside', 'text-center', 'pl-0');
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                const listItem = document.createElement('li');
                listItem.textContent = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
                ingredientsList.appendChild(listItem);
            }
        }
        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.textContent = 'Ingredients:';
        ingredientsTitle.classList.add('text-lg', 'font-semibold', 'mb-2', 'text-center');
        ingredientsDiv.appendChild(ingredientsTitle);
        ingredientsDiv.appendChild(ingredientsList);
        ingredientsDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full');


        const instructionsDiv = document.createElement('div');
        const instructionsTitle = document.createElement('h3');
        instructionsTitle.textContent = 'Instructions:';
        instructionsTitle.classList.add('text-lg', 'font-semibold', 'mb-2', 'text-center');
        instructionsDiv.appendChild(instructionsTitle);
        const instructionsArray = meal.strInstructions.split('\r\n').filter(paragraph => paragraph.trim() !== '');
        const instructionsList = document.createElement('ol');
        instructionsList.classList.add('list-decimal', 'list-inside', 'text-lg', 'text-gray-700', 'space-y-2', 'text-justify');
        instructionsArray.forEach(instruction => {
            const listItem = document.createElement('li');
            listItem.textContent = instruction;
            instructionsList.appendChild(listItem);
        });
        instructionsDiv.appendChild(instructionsList);
        instructionsDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full');

        let ytLink;
        if (meal.strYoutube.trim()) {
            ytLink = document.createElement('a');
            ytLink.href = meal.strYoutube;
            ytLink.target = '_blank';
            ytLink.textContent = 'Watch Video Tutorial';
            ytLink.classList.add('block', 'text-center', 'text-blue-500', 'hover:underline', 'font-semibold', 'border', 'p-4', 'rounded', 'shadow', 'w-full', 'hover:scale-105', 'transition', 'duration-150', 'ease-in-out', 'md:hidden', 'lg:order-4');
        }
        let ytEmbedDiv;
        if (ytLink) {

            let videoId;
            try {
                const url = new URL(meal.strYoutube);
                videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
            } catch {
                videoId = null;
                ytLink.classList.remove('lg:hidden');
            }

            if (videoId) {
                ytEmbedDiv = document.createElement('div');
                const ytEmbed = document.createElement('iframe');
                ytEmbed.classList.add('rounded', 'shadow', 'w-full', 'h-full');
                ytEmbed.src = `https://www.youtube.com/embed/${videoId}`;
                ytEmbed.width = '100%';
                ytEmbed.height = '315';
                ytEmbed.allowFullscreen = true;
                ytEmbedDiv.classList.add('border', 'rounded', 'shadow', 'w-full', 'hidden', 'md:block', 'order-4', 'flex', 'justify-center', 'items-center', 'md:col-span-2', 'lg:col-span-1', 'flex', 'justify-center', 'items-center');
                ytEmbedDiv.appendChild(ytEmbed);
            }
        }


        recipeDiv.appendChild(titleDiv);
        titleDiv.classList.add('md:order-1');
        recipeDiv.appendChild(recipeImg);
        recipeImg.classList.add('md:order-3', 'lg:order-2', 'lg:col-span-2', 'lg:row-span-2');
        if (ytLink) {
            recipeDiv.appendChild(ytLink);
            ytLink.classList.add('md:col-span-2', 'md:order-3');
            recipeDiv.appendChild(ytEmbedDiv);

        }
        recipeDiv.appendChild(ingredientsDiv);
        ingredientsDiv.classList.add('md:order-2', 'md:row-span-2', 'lg:row-span-1');
        recipeDiv.appendChild(instructionsDiv);
        instructionsDiv.classList.add('md:order-4', 'md:col-span-2', 'lg:col-start-2', 'lg:order-5');
        recipeResultsDiv.appendChild(recipeDiv);




    }

    function displayMessage(message) {
        recipeResultsDiv.innerHTML = '';
        messageDiv.textContent = message;
        recipeResultsDiv.appendChild(messageDiv);
    }

})();