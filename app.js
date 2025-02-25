// Flower - Habit Tracker PWA
// Main JavaScript for the application

// Data structure to hold habits in localStorage
// Each habit has a name, lastWatered date, growthStage, and optional flower type
let habits = [];

// DOM Elements
const habitList = document.getElementById('habits-list');
const addHabitBtn = document.getElementById('add-habit-btn');
const newHabitNameInput = document.getElementById('new-habit-name');
const flowerDetails = document.getElementById('flower-details');

// Load habits from localStorage on startup
window.addEventListener('load', () => {
  loadHabits();
  renderHabitList();
});

// Add new habit
addHabitBtn.addEventListener('click', () => {
  const name = newHabitNameInput.value.trim();
  if (name) {
    const habit = {
      id: Date.now().toString(),
      name,
      lastWatered: null,
      growthStage: 0,
      flowerType: 'default'
    };
    habits.push(habit);
    saveHabits();
    renderHabitList();
    newHabitNameInput.value = '';
  }
});

// Render habit list
function renderHabitList() {
  habitList.innerHTML = '';
  habits.forEach(habit => {
    const li = document.createElement('li');
    li.textContent = habit.name;
    li.addEventListener('click', () => selectHabit(habit.id));
    habitList.appendChild(li);
  });
}

// Select a habit and display flower details
function selectHabit(habitId) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  // Display flower details
  flowerDetails.innerHTML = `
    <h3>${habit.name}</h3>
    <div id="flower-pane">
      <img 
        src="./images/${habit.flowerType}.png" 
        alt="Flower Image" 
        class="${isWilted(habit) ? 'wilted' : ''}" 
        style="width: 150px; height: auto;"
      />
      <p>Growth Stage: ${habit.growthStage}</p>
    </div>
    <button id="water-flower-btn">Water this flower</button>
    <button id="delete-habit-btn">Delete Habit</button>
  `;

  // Add event listener for watering
  const waterFlowerBtn = document.getElementById('water-flower-btn');
  waterFlowerBtn.addEventListener('click', () => waterHabit(habit.id));

  // Add event listener for delete
  const deleteHabitBtn = document.getElementById('delete-habit-btn');
  deleteHabitBtn.addEventListener('click', () => deleteHabit(habit.id));
}

// Check if the flower is wilted
function isWilted(habit) {
  if (!habit.lastWatered) return true;
  const lastWateredDate = new Date(habit.lastWatered);
  const now = new Date();
  const daysDifference = (now - lastWateredDate) / (1000 * 3600 * 24);
  // If it's been more than 2 days since watering, consider it wilted
  return daysDifference > 2;
}

// Water a habit
function waterHabit(habitId) {
  const habitIndex = habits.findIndex(h => h.id === habitId);
  const now = new Date();

  if (habitIndex >= 0) {
    // Update habit data
    habits[habitIndex].lastWatered = now.toISOString();
    habits[habitIndex].growthStage += 1;
    saveHabits();
    renderHabitList();
    selectHabit(habitId);
  }
}

// Delete a habit
function deleteHabit(habitId) {
  habits = habits.filter(h => h.id !== habitId);
  saveHabits();
  renderHabitList();
  flowerDetails.innerHTML = `<p>Select a habit to see its flower</p>`;
}

// Save habits to localStorage
function saveHabits() {
  localStorage.setItem('flowerHabits', JSON.stringify(habits));
}

// Load habits from localStorage
function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem('flowerHabits')) || [];
  habits = storedHabits;
}
