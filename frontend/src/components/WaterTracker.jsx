import { useState } from "react";

function WaterTracker() {

  const goal = 3; // 3 Liters

  const [water, setWater] = useState(0);

  const addGlass = () => {
    setWater((prev) => Math.min(prev + 0.25, goal));
  };

  const removeGlass = () => {
    setWater((prev) => Math.max(prev - 0.25, 0));
  };

  const progress = (water / goal) * 100;

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded-lg mt-6">

      <h2 className="text-2xl font-bold mb-4">
        💧 Water Tracker
      </h2>

      <p>
        Goal: {goal}L
      </p>

      <p>
        Current: {water.toFixed(2)}L
      </p>

      <p>
        Progress: {progress.toFixed(0)}%
      </p>

      <div className="w-full bg-gray-200 rounded-full h-6 mt-3">

        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>

      </div>

      <div className="mt-4 flex gap-3">

        <button
          onClick={addGlass}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + 1 Glass
        </button>

        <button
          onClick={removeGlass}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          - 1 Glass
        </button>

      </div>

    </div>
  );
}

export default WaterTracker;