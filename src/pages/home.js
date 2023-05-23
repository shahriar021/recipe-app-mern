import React, { useEffect, useState } from "react";

import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };


    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/savedRecipes/ids/${userID}`
        );
         setSavedRecipes(response.data.savedRecipes);
        
      } catch (err) {
        console.log(err);
      }
    };
    

    fetchRecipe();
    fetchSavedRecipe();
    
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
        const response = await axios.put("http://localhost:5000/recipes",
        {recipeID,userID});
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    const isRecipeSaved = (id) => savedRecipes?.includes(id);

  

  return (
    <div>
      <h1>All Recipes</h1>s
      <h2>enjoy!!</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes?.includes(recipe._id) && (
              <h1>Already Saved Recipe</h1>
            )}

            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save Recipe"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
