/*******************************************************
 * FLOWER HABIT TRACKER - Enhanced UI
 * - Water/Unwater/Reset
 * - Multiple Themes
 * - Distinct Flower Shapes & Animations
 * - LocalStorage
 * - Toast Notifications
 *******************************************************/

// SELECTORS
const openModalBtn     = document.getElementById("open-modal-btn");
const closeModalBtn    = document.getElementById("close-modal-btn");
const modal            = document.getElementById("modal");
const addHabitBtn      = document.getElementById("add-habit-btn");
const habitNameInput   = document.getElementById("habit-name");
const timesPerDayInput = document.getElementById("times-per-day");
const flowerTypeSelect = document.getElementById("flower-type");
const gardenContainer  = document.getElementById("garden");
const toastContainer   = document.getElementById("toast-container");
const resetAllBtn      = document.getElementById("reset-all-btn");
const themeButtons     = document.querySelectorAll(".theme-btn");

// GLOBAL DATA
let habits = []; // store habit objects

/*******************************************************
 * INIT
 *******************************************************/
window.addEventListener("DOMContentLoaded", () => {
  loadHabitsFromStorage();
  loadThemeFromStorage();
  renderHabits();
});

/*******************************************************
 * THEME SWITCHER
 *******************************************************/
themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedTheme = btn.dataset.theme;
    // Remove old theme classes
    document.body.classList.remove(
      "theme-dark",
      "theme-pink",
      "theme-blue",
      "theme-green"
    );
    if (selectedTheme !== "light") {
      document.body.classList.add(`theme-${selectedTheme}`);
    }
    localStorage.setItem("flowerTheme", selectedTheme);
  });
});

function loadThemeFromStorage() {
  const savedTheme = localStorage.getItem("flowerTheme") || "light";
  if (savedTheme !== "light") {
    document.body.classList.add(`theme-${savedTheme}`);
  }
}

/*******************************************************
 * MODAL (ADD HABIT)
 *******************************************************/
openModalBtn.addEventListener("click", () => {
  openHabitModal();
});
closeModalBtn.addEventListener("click", closeHabitModal);
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeHabitModal();
  }
});

function openHabitModal() {
  modal.classList.add("show");
  habitNameInput.focus();
}
function closeHabitModal() {
  modal.classList.remove("show");
  // Reset fields
  habitNameInput.value = "";
  timesPerDayInput.value = 1;
  flowerTypeSelect.value = "rose";
}

/*******************************************************
 * ADD HABIT
 *******************************************************/
addHabitBtn.addEventListener("click", () => {
  const name = habitNameInput.value.trim();
  const timesPerDay = parseInt(timesPerDayInput.value, 10) || 1;
  const flowerType = flowerTypeSelect.value;

  if (!name) {
    showToast("Please enter a habit name.");
    return;
  }
  if (timesPerDay < 1) {
    showToast("Times Per Day must be at least 1.");
    return;
  }

  const newHabit = {
    id: Date.now(),
    name,
    dailyGoal: timesPerDay,
    dailyCount: 0,
    growthStage: 0,
    maxGrowthStage: 5,
    flowerType,
    sideNotes: "",
  };

  habits.push(newHabit);
  saveHabitsToStorage();
  renderHabits();
  showToast(`Added new habit: "${name}"`);
  closeHabitModal();
});

/*******************************************************
 * RENDER HABITS
 *******************************************************/
function renderHabits() {
  gardenContainer.innerHTML = "";

  habits.forEach((habit) => {
    // BUILD CARD
    const card = document.createElement("div");
    card.className = "habit-card";

    // TITLE
    const titleDiv = document.createElement("div");
    titleDiv.className = "habit-title";
    titleDiv.textContent = habit.name;
    card.appendChild(titleDiv);

    // DESCRIPTION
    const descDiv = document.createElement("div");
    descDiv.className = "habit-description";
    descDiv.textContent = `Goal: ${habit.dailyGoal} | Growth: ${habit.growthStage}/${habit.maxGrowthStage}`;
    card.appendChild(descDiv);

    // FLOWER
    const flowerElem = buildFlower(habit.flowerType, habit.growthStage);
    card.appendChild(flowerElem);

    // PROGRESS BAR
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    const dailyProgress = (habit.dailyCount / habit.dailyGoal) * 100;
    progressFill.style.width = `${Math.min(dailyProgress, 100)}%`;
    progressBar.appendChild(progressFill);
    card.appendChild(progressBar);

    // FOOTER
    const footer = document.createElement("div");
    footer.className = "habit-footer";

    // Side notes
    const notesArea = document.createElement("textarea");
    notesArea.className = "side-notes";
    notesArea.placeholder = "Write side notes here...";
    notesArea.value = habit.sideNotes || "";
    notesArea.addEventListener("change", () => {
      habit.sideNotes = notesArea.value;
      saveHabitsToStorage();
    });
    footer.appendChild(notesArea);

    // ACTIONS
    const actionDiv = document.createElement("div");
    actionDiv.className = "habit-actions";

    // Water button
    const waterBtn = document.createElement("button");
    waterBtn.className = "secondary-btn";
    waterBtn.textContent = `Water (${habit.dailyCount}/${habit.dailyGoal})`;
    waterBtn.addEventListener("click", () => waterHabit(habit, flowerElem, progressFill, waterBtn));
    actionDiv.appendChild(waterBtn);

    // Unwater button
    const unwaterBtn = document.createElement("button");
    unwaterBtn.className = "unwater-btn";
    unwaterBtn.textContent = "Unwater";
    unwaterBtn.addEventListener("click", () => unwaterHabit(habit, flowerElem, progressFill, waterBtn));
    actionDiv.appendChild(unwaterBtn);

    // Reset button
    const resetBtn = document.createElement("button");
    resetBtn.className = "reset-btn";
    resetBtn.textContent = "Reset to 0";
    resetBtn.addEventListener("click", () => resetHabit(habit, flowerElem, progressFill, waterBtn));
    actionDiv.appendChild(resetBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteHabit(habit.id));
    actionDiv.appendChild(deleteBtn);

    footer.appendChild(actionDiv);
    card.appendChild(footer);

    gardenContainer.appendChild(card);
  });
}

/*******************************************************
 * BUILD FLOWER
 *******************************************************/
function buildFlower(flowerType, growthStage) {
  const container = document.createElement("div");
  container.className = `flower-container ${flowerType} grow-stage-${growthStage}`;

  let petalCount = 0;
  if (flowerType === "rose") {
    petalCount = 6;
  } else if (flowerType === "tulip") {
    petalCount = 4;
  } else if (flowerType === "sunflower") {
    petalCount = 9;
  }
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    container.appendChild(petal);
  }
  return container;
}

/*******************************************************
 * WATER HABIT
 *******************************************************/
function waterHabit(habit, flowerElem, progressElem, waterBtn) {
  if (habit.dailyCount < habit.dailyGoal) {
    habit.dailyCount++;
    showToast(`Watered "${habit.name}" (${habit.dailyCount}/${habit.dailyGoal})`);

    // If we hit dailyGoal, increase growth stage
    if (habit.dailyCount === habit.dailyGoal) {
      if (habit.growthStage < habit.maxGrowthStage) {
        habit.growthStage++;
        updateFlowerGrowth(flowerElem, habit.growthStage);
        showToast(`"${habit.name}" grew to stage ${habit.growthStage}!`);
      }
    }
  } else {
    showToast(`"${habit.name}" is already fully watered today.`);
  }

  const dailyProgress = (habit.dailyCount / habit.dailyGoal) * 100;
  progressElem.style.width = `${Math.min(dailyProgress, 100)}%`;
  waterBtn.textContent = `Water (${habit.dailyCount}/${habit.dailyGoal})`;

  saveHabitsToStorage();
  renderHabits();
}

/*******************************************************
 * UNWATER HABIT
 *******************************************************/
function unwaterHabit(habit, flowerElem, progressElem, waterBtn) {
  if (habit.dailyCount > 0) {
    habit.dailyCount--;
    showToast(`Unwatered "${habit.name}" (${habit.dailyCount}/${habit.dailyGoal})`);

    // If we just went below dailyGoal from dailyGoal, revert growth stage
    if (habit.dailyCount === habit.dailyGoal - 1) {
      if (habit.growthStage > 0) {
        habit.growthStage--;
        updateFlowerGrowth(flowerElem, habit.growthStage);
        showToast(`"${habit.name}" reverted to stage ${habit.growthStage}`);
      }
    }
  } else {
    showToast(`No water left to remove for "${habit.name}".`);
  }

  const dailyProgress = (habit.dailyCount / habit.dailyGoal) * 100;
  progressElem.style.width = `${Math.min(dailyProgress, 100)}%`;
  waterBtn.textContent = `Water (${habit.dailyCount}/${habit.dailyGoal})`;

  saveHabitsToStorage();
  renderHabits();
}

/*******************************************************
 * RESET HABIT
 *******************************************************/
function resetHabit(habit, flowerElem, progressElem, waterBtn) {
  habit.dailyCount = 0;
  habit.growthStage = 0;
  updateFlowerGrowth(flowerElem, 0);
  progressElem.style.width = "0%";
  waterBtn.textContent = `Water (0/${habit.dailyGoal})`;

  showToast(`"${habit.name}" reset to 0.`);
  saveHabitsToStorage();
  renderHabits();
}

/*******************************************************
 * UPDATE FLOWER GROWTH
 *******************************************************/
function updateFlowerGrowth(flowerElem, newStage) {
  // Remove old stage classes
  for (let i = 0; i <= 5; i++) {
    flowerElem.classList.remove(`grow-stage-${i}`);
  }
  // Add new stage
  flowerElem.classList.add(`grow-stage-${newStage}`);
}

/*******************************************************
 * DELETE HABIT
 *******************************************************/
function deleteHabit(habitId) {
  if (!confirm("Are you sure you want to delete this habit?")) {
    return;
  }
  habits = habits.filter((h) => h.id !== habitId);
  saveHabitsToStorage();
  renderHabits();
  showToast("Habit deleted.");
}

/*******************************************************
 * RESET ALL HABITS
 *******************************************************/
resetAllBtn.addEventListener("click", () => {
  if (!confirm("Are you sure you want to reset ALL habits? This clears all data.")) {
    return;
  }
  localStorage.clear();
  habits = [];
  renderHabits();
  showToast("All habits have been reset.");
});

/*******************************************************
 * LOCAL STORAGE
 *******************************************************/
function saveHabitsToStorage() {
  localStorage.setItem("flowerHabits", JSON.stringify(habits));
}
function loadHabitsFromStorage() {
  const data = localStorage.getItem("flowerHabits");
  if (data) {
    habits = JSON.parse(data);
  }
}

/*******************************************************
 * TOAST / SNACKBAR
 *******************************************************/
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toastContainer.contains(toast)) {
      toastContainer.removeChild(toast);
    }
  }, 3000);
}
