class Flower {
  constructor(habit) {
    this.habit = habit;
    this.streak = 0;
    this.lastWatered = null;
  }

  render() {
    const flowerElement = document.createElement('div');
    flowerElement.className = 'flower';
    flowerElement.innerHTML = `
      <svg class="flower-svg" viewBox="0 0 100 100">
        <!-- SVG paths for flower visualization -->
        <circle cx="50" cy="50" r="${10 + this.streak}" fill="${this.habit.color}"/>
      </svg>
      <div class="habit-name">${this.habit.name}</div>
      <button class="water-btn">💧 Water</button>
    `;
    return flowerElement;
  }

  water() {
    if (!this.canWaterToday()) return;
    this.streak++;
    this.lastWatered = new Date();
    this.updateStorage();
  }

  canWaterToday() {
    const last = new Date(this.lastWatered);
    return !(last.toDateString() === new Date().toDateString());
  }
}
