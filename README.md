# Flower - Habit Tracker PWA

## Objective
Develop a Progressive Web App (PWA) called "Flower" to help users track their daily habits by visually growing virtual flowers.

## Features
- Responsive design for mobile (iPhone) and desktop.
- Each habit is represented by a unique flower.
- Users can add, edit, delete, and "water" habits daily.
- Growth animation for flowers (increasing growth stage each time the habit is completed).
- Service Worker and manifest for PWA functionality (offline support and home screen installation).
- Uses `localStorage` to store habit data.

## Project Structure
- `index.html` – Main entry point for the application.
- `style.css` – Styling for the application.
- `app.js` – Core logic for habit tracking and flower growth.
- `service-worker.js` – Manages caching for offline support.
- `manifest.json` – Defines app icons, theme, and start URL for PWA install.

```
Flower-PWA/
├── index.html
├── style.css
├── app.js
├── service-worker.js
├── manifest.json
├── images/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── default.png (flower image example)
└── README.md
```

## Deployment on GitHub Pages
1. Initialize a repository on GitHub and push your local code.
2. In your repository's settings, enable GitHub Pages from the `main` branch (or the branch you prefer).
3. After a few minutes, your app will be accessible at: `https://username.github.io/Flower-PWA/` (replace "username" with your GitHub username).

## Testing
- Test app on an iPhone by opening the deployed URL in Safari.
- Add to Home Screen to test standalone mode.
- Check offline functionality by disabling the network and confirming the app still loads if cached properly.
- Verify localStorage persists habit data between sessions.
