const box = document.querySelector('.about-recipe');
const btn = document.querySelector('.demo');

const loadData = async () => {
    const url ='https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();

   
    return data.meals[0];
};



btn.addEventListener('click', e =>{
    e.preventDefault();

//viev data
    loadData()
    .then(data => viewData(data))
    .catch(err => console.log(err));


    const viewData = (meal) => {
        const ingredients = [];

        for(let i=1; i<=20; i++) {
            if(meal[`strIngredient${i}`]){
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
            } else {
                break;
            }
            
        }
            const html = `
            
                    <div class="meal-spec">              
                        <div class="food-img">
                            <img src="${meal.strMealThumb}" width="315px" height="300px">
                        </div>              
                        <div class="recipe">
                            <h1>${meal.strMeal}</h1>
                            <p>${meal.strInstructions}</p>
                        </div>
                    </div>          
                    <div class="ingredients">
                        <p><b>Category:</b> ${meal.strCategory}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            ${ingredients.map(ingredient => `<li class="item-list">${ingredient}</li>`).join('')}
                        </ul>
                    </div>  
                    <div class="video">
                    <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"width="700" height="500" class="video-frame"></iframe>
                    </div>
                
            `;

                box.innerHTML = html;
                box.classList.remove('d-none');
    };
});


























