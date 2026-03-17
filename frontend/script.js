const API = "https://fittrack-pro-qldc.onrender.com/api";

let chart;

/* ================= DARK MODE ================= */

const toggle = document.querySelector(".toggle-btn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
}

/* ================= REGISTER ================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
      window.location.href = "index.html";
    } else {
      alert(data.error || "Registration failed");
    }
  });
}

/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed");
    }
  });
}

/* ================= DASHBOARD ================= */

const workoutForm = document.getElementById("workoutForm");
const workoutList = document.getElementById("workoutList");
const totalCaloriesEl = document.getElementById("totalCalories");

const token = localStorage.getItem("token");

/* Redirect if not logged in */
if (!token && window.location.pathname.includes("dashboard")) {
  window.location.href = "index.html";
}

/* ================= ADD WORKOUT ================= */

if (workoutForm) {

  workoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const duration = document.getElementById("duration").value;
    const calories = document.getElementById("calories").value;

    const res = await fetch(`${API}/workout/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        exercise,
        duration: Number(duration),
        caloriesBurned: Number(calories)
      })
    });

    if (!res.ok) {
      alert("Failed to add workout");
      return;
    }

    workoutForm.reset();
    loadWorkouts();
  });

  loadWorkouts();
}

/* ================= LOAD WORKOUTS ================= */

async function loadWorkouts() {

  const res = await fetch(`${API}/workout/user`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    alert("Failed to load workouts");
    return;
  }

  const data = await res.json();

  if (!workoutList || !totalCaloriesEl) return;

  workoutList.innerHTML = "";

  let total = 0;

  data.forEach(w => {

    total += Number(w.caloriesBurned);

    const li = document.createElement("li");
    li.textContent = `${w.exercise} - ${w.duration} mins - ${w.caloriesBurned} cal`;

    workoutList.appendChild(li);
  });

  totalCaloriesEl.textContent = total;

  renderChart(data);
}

/* ================= WEEKLY GROUPING ================= */

function groupByWeek(workouts) {

  const weeks = {};

  workouts.forEach(w => {

    const date = new Date(w.createdAt);
    const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;

    if (!weeks[week]) {
      weeks[week] = 0;
    }

    weeks[week] += Number(w.caloriesBurned);
  });

  return weeks;
}

/* ================= CHART ================= */

function renderChart(data) {

  const ctx = document.getElementById("chart");
  if (!ctx) return;

  const weekly = groupByWeek(data);

  const labels = Object.keys(weekly);
  const calories = Object.values(weekly);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Weekly Calories Burned",
        data: calories,
        borderWidth: 3,
        tension: 0.3
      }]
    }
  });
}

/* ================= LOGOUT ================= */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
}