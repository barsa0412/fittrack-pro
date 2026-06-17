import { useState } from "react";

function NutritionTracker() {

  const [foods, setFoods] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [mealType, setMealType] = useState("Breakfast");

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const addFood = () => {

    const newFood = {
      foodName,
      mealType,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat)
    };

    setFoods([...foods, newFood]);

    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const totalCalories =
    foods.reduce((sum, item) => sum + item.calories, 0);

  const totalProtein =
    foods.reduce((sum, item) => sum + item.protein, 0);

  const totalCarbs =
    foods.reduce((sum, item) => sum + item.carbs, 0);

  const totalFat =
    foods.reduce((sum, item) => sum + item.fat, 0);

  return (
    <div>

      <h2>Nutrition Tracker</h2>

      <input
        placeholder="Food Name"
        value={foodName}
        onChange={(e)=>setFoodName(e.target.value)}
      />

      <select
        value={mealType}
        onChange={(e)=>setMealType(e.target.value)}
      >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snacks</option>
      </select>

      <input
        placeholder="Calories"
        value={calories}
        onChange={(e)=>setCalories(e.target.value)}
      />

      <input
        placeholder="Protein"
        value={protein}
        onChange={(e)=>setProtein(e.target.value)}
      />

      <input
        placeholder="Carbs"
        value={carbs}
        onChange={(e)=>setCarbs(e.target.value)}
      />

      <input
        placeholder="Fat"
        value={fat}
        onChange={(e)=>setFat(e.target.value)}
      />

      <button onClick={addFood}>
        Add Food
      </button>

      <hr />

      <h3>Total Calories: {totalCalories}</h3>
      <h3>Total Protein: {totalProtein} g</h3>
      <h3>Total Carbs: {totalCarbs} g</h3>
      <h3>Total Fat: {totalFat} g</h3>

    </div>
  );
}

export default NutritionTracker;