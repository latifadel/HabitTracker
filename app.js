<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Flower Habit Tracker - Enhanced UI</title>

  <!-- Google Fonts: Poppins -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />

  <!-- Link to styles.css -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- HEADER -->
  <header class="app-header">
    <div class="app-branding">
      <!-- Simple Inline SVG Logo -->
      <svg width="50" height="50" viewBox="0 0 512 512" aria-hidden="true">
        <path fill="currentColor" d="M256,16C200,64,128,140,128,216c0,82.8,67.2,150,150,150s150-67.2,150-150C428,140,356,64,300,16H256z"/>
        <circle fill="currentColor" cx="256" cy="216" r="40"/>
      </svg>
      <h1>Flower Habit Tracker</h1>
    </div>

    <!-- THEME SWITCHER -->
    <nav class="theme-switcher" aria-label="Theme Switcher">
      <button class="theme-btn" data-theme="light">Light</button>
      <button class="theme-btn" data-theme="dark">Dark</button>
      <button class="theme-btn" data-theme="pink">Pink</button>
      <button class="theme-btn" data-theme="blue">Blue</button>
      <button class="theme-btn" data-theme="green">Green</button>
    </nav>
  </header>

  <!-- MAIN CONTENT -->
  <main class="main-content">
    <!-- TOP ACTION BUTTONS -->
    <section class="top-actions">
      <button id="open-modal-btn" class="primary-btn" aria-label="Add New Habit">+ Add New Habit</button>
      <button id="reset-all-btn" class="secondary-btn" aria-label="Reset All Habits">Reset All Habits</button>
    </section>

    <!-- GARDEN CONTAINER (Habit Cards) -->
    <section class="garden-section">
      <h2 class="section-title">Your Habits</h2>
      <div id="garden" class="garden-container">
        <!-- Habit cards will be dynamically inserted here by app.js -->
      </div>
    </section>
  </main>

  <!-- MODAL: Add a New Habit -->
  <div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-content">
      <button id="close-modal-btn" class="close" aria-label="Close Add Habit Modal">&times;</button>
      <h2 id="modal-title">Add a New Habit</h2>

      <label for="habit-name">Habit Name</label>
      <input
        type="text"
        id="habit-name"
        placeholder="E.g., Morning Jog"
        aria-label="Habit Name"
      />

      <label for="times-per-day">Times Per Day</label>
      <input
        type="number"
        id="times-per-day"
        min="1"
        value="1"
        aria-label="Times Per Day for the Habit"
      />

      <label for="flower-type">Flower Type</label>
      <select id="flower-type" aria-label="Select Flower Type">
        <option value="rose">Rose</option>
        <option value="tulip">Tulip</option>
        <option value="sunflower">Sunflower</option>
      </select>

      <button id="add-habit-btn" class="primary-btn" aria-label="Confirm Add Habit">
        Add Habit
      </button>
    </div>
  </div>

  <!-- TOAST / SNACKBAR Container -->
  <div id="toast-container" aria-live="polite" aria-atomic="true"></div>

  <!-- Link to app.js -->
  <script src="app.js"></script>
</body>
</html>
