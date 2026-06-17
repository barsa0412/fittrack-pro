import { useState } from "react";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {

    if (!height || !weight) {
      alert("Enter height and weight");
      return;
    }

    const bmiValue =
      weight / ((height / 100) * (height / 100));

    const finalBMI = bmiValue.toFixed(2);

    setBmi(finalBMI);

    if (finalBMI < 18.5) {
      setStatus("Underweight");
    }
    else if (finalBMI < 25) {
      setStatus("Normal");
    }
    else if (finalBMI < 30) {
      setStatus("Overweight");
    }
    else {
      setStatus("Obese");
    }
  };

  return (
    <div>

      <h2>BMI Calculator</h2>

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <br /><br />

      <button onClick={calculateBMI}>
        Calculate BMI
      </button>

      {bmi && (
        <div>
          <h3>Your BMI: {bmi}</h3>
          <h3>Status: {status}</h3>
        </div>
      )}

    </div>
  );
}

export default BMI;