# Setcount — refreshed UI build

## Structure
- `index.html` — app shell and metadata
- `css/style.css` — original component styling plus the refreshed responsive theme
- `js/app.js` — original workout tracking logic and embedded exercise illustration assets

## Run
Serve the folder over HTTPS, or use `http://localhost` for local development. Service workers do not work when opening `index.html` directly as a `file://` URL. Install Setcount from the browser's install option after opening it online once; the app shell and same-origin assets you visit are then cached for offline use. The favicon and install icon are in `assets/favicon.svg`.

The core app works offline after its first successful load. The optional camera form check still needs an internet connection the first time because its MediaPipe code and model are downloaded from public CDNs. Fonts use local system fallbacks so the interface does not depend on Google Fonts.

## Data
Workout and profile data stays in the browser using the existing `setcount-v1` localStorage key; no account or cloud service is used. Use **Profile → Data → Export backup** to download a JSON copy, or **Restore backup** to replace this browser's saved data. Restore accepts Setcount backup files and asks for confirmation before replacing data. Backups contain personal profile and workout history, so keep them private.

Muscle fatigue estimates are saved locally with workout data. Each completed set adds 20 points to its target muscles, capped at 100; the estimate recovers by 20 points per day. This is a simple training heuristic, not a medical or readiness assessment.

In **Library → Exercises**, use the star to save or remove an exercise from favorites. Filter favorites by muscle group and equipment, or add a custom exercise with any name, user-written muscle/category and equipment/object (for example, a water bottle), starting weight, increments, reps, and sets. On supported phones, use the photo field to take a picture with the camera or select one from the device. Images are resized and compressed in the browser, then saved locally with the exercise and included in exported backups; no photo is uploaded. Large images can exceed browser storage limits, so export a backup regularly.

Use **Plan** to set a repeating weekly schedule from the built-in workout splits, choose rest days, and review completed workouts by week. The plan is stored locally and included in backups. Start today's planned session from Plan or the Today screen.

The optional Bench Press form check uses the MediaPipe Pose Landmarker in the browser. Camera access requires HTTPS or localhost and explicit permission. Video frames are processed on-device and are not uploaded or recorded; the MediaPipe JavaScript bundle, WASM runtime, and pose model are downloaded from public CDNs when the feature is first started, so an internet connection is required. The experimental 2D elbow-flare cue can be inaccurate and should not replace in-person coaching.

## Dependencies
The core app still has no build step or runtime package installation. The optional camera coach lazily loads the pinned MediaPipe Tasks Vision 1.2.0 bundle and its WASM/model assets from CDNs; those assets are not needed for other app features. The app draws its icons, progress rings, charts, and muscle diagrams with inline SVG/CSS.
