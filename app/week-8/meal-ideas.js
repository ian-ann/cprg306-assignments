"use client";

import React, { useState, useEffect } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  };

  const fetchMealIngredients = async (idMeal) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await response.json();
    return data.meals[0];
  };

  const loadMealIdeas = async () => {
    if (ingredient) {
      const mealIdeas = await fetchMealIdeas(ingredient);
      setMeals(mealIdeas);
    }
  };

  const handleMealClick = async (idMeal) => {
    const meal = await fetchMealIngredients(idMeal);
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      }
    }
    setSelectedMeal(idMeal);
    setIngredients(ingredients);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div >
       <div className="flex-col p-1 m-2">
        <h2 className="content-center text-center font-bold mx-3 flex-row p-2">Meal Ideas</h2>
      </div>
      <div>
        <ul className="mx-3 bg-gray-600 flex-row p-10">
          {meals && meals.map(meal => (
            <li key={meal.idMeal} className="flex items-start mb-4 bg-gray-400 list-none border border-red-500 my-4 p-4 mx-3">
              <img
                className="w-1/4 h-1/4 object-cover mr-4 cursor-pointer rounded-s-lg"
                src={meal.strMealThumb}
                alt={meal.strMeal}
                onClick={() => handleMealClick(meal.idMeal)}
              />
              <div>
                <h3
                  className='text-l text-gray-800 font-bold cursor-pointer'
                  onClick={() => handleMealClick(meal.idMeal)}
                >
                  {meal.strMeal}
                </h3>
                {selectedMeal === meal.idMeal && (
                  <ul className="ml-4">
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealIdeas;