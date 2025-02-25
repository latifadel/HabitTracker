window.onload = function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
};

function addHabit() {
    const name = prompt("Enter the name of the new habit:");
    if (name) {
        const template = document.getElementById("habit-template").content.cloneNode(true);
        template.querySelector(".habit-name").textContent = name;
        template.querySelector(".delete").onclick = function() {
            this.parentNode.remove();
        };
        document.getElementById("habit-list").appendChild(template);
    }
}
