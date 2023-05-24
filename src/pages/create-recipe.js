import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";



export const CreateRecipes = () => {
    const userID = useGetUserID();


  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });


  const navigate = useNavigate();


  const handleChange = (e) => {
    const {name,value} = e.target;
    setRecipe({...recipe,[name]:value});
  };

    const handleIngredientChange = (e,index) => {
    const {value} = e.target;
    const ingredints = recipe.ingredients;
    ingredints[index] = value;
    setRecipe({...recipe,ingredints});
    
  };


  const addIngredients = (e) => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({...recipe,ingredients});
  };
  

  const onSubmit= async(e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/recipes",recipe);
      console.log(recipe)
      alert("Recipe Created");
      navigate("/");
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="create-recipe">
      <h2>CreateRecipes</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
          />
        ))}
        <button onClick={addIngredients} type="button">
          Add Ingredient
        </button>

        <label htmlFor="instructions">instructions for recipes</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cooking-Time">cooking time(min)</label>
        <input
          type="number"
          id="cooking-Time"
          name="cooking-Time"
          onChange={handleChange}
        />
        <button ype="submit">
          create recipe
        </button>
      </form>
    </div>
  );
};
