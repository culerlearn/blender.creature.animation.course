### Prompt for Claude Agent

**Role & Task:**
Act as a Senior 3D Web Engineer. Write a complete, fully functional Three.js application in JavaScript that loads an animated crab GLB model, places it in a 3D environment, controls its movements, and manages its animations using strict Object-Oriented Programming (OOP) principles.

---

### Project Requirements & Architecture Guidelines:

1. **Strict Object-Oriented Structure:**
* Use **ES6 Classes only**.
* No top-level functions, logic, or state should exist outside of a class, except for the single entry-point instantiation script (e.g., `const app = new App(); app.init();`).
* Adhere strictly to the **Single Responsibility Principle (SRP)** by abstracting functionality into dedicated manager/helper classes.


2. **Core Modules to Abstract into Separate Classes:**
* `SceneManager`: Handles scene creation, camera setup, lighting (ambient/directional), renderer configuration, and window resize listeners.
* `ModelLoader`: Wraps `GLTFLoader` to handle loading the crab GLB model asynchronously, returning clean promises or callbacks.
* `AnimationController`: Encapsulates Three.js `AnimationMixer` logic, manages clip playback, handles action transitions/blends, and auto-detects available animations in the GLB file.
* `Environment`: Creates a ground terrain/mesh (e.g., a sandy beach or textured plane) for the character to walk on, including lighting/shadow receivers.
* `CharacterController`: Manages character positioning, movement velocity, directional heading/rotation, and linking locomotion animations (e.g., walking/idle states) to physical translation.
* `DistanceTracker`: Tracks the cumulative distance traveled by the crab and provides API updates for HUD reporting.
* `UIManager`: Handles HTML/CSS overlay creation, including movement buttons, animation dropdowns/buttons dynamically generated from detected animations, and the HUD distance counter.
* `App`: The orchestrator class that instantiates all modules, wires event listeners, and manages the main `requestAnimationFrame` loop.



---

### Functional Features:

1. **Scene & Model Setup:**
* Import a GLB crab model and position it at the center of the world (`0, 0, 0`).
* Scale and ground the model properly on top of the terrain.


2. **Animation & Dynamic Inspection:**
* Automatically inspect the imported GLB file for all available `AnimationClip` tracks upon loading.
* Pass detected animations to the `UIManager` to dynamically create named UI controls (buttons or a select menu) that allow the user to trigger/play any detected animation on demand.


3. **Movement & Environment:**
* Build a styled environment plane for the crab to explore.
* Implement UI movement controls (e.g., Forward, Backward, Turn Left, Turn Right) via the `UIManager` and `CharacterController`.
* Trigger the walking animation whenever the crab is actively moving, and blend smoothly back to idle when stationary.


4. **Distance Tracking HUD:**
* Maintain a HUD element on screen displaying total distance walked (e.g., in meters/units).
* Calculate distance dynamically based on character translation over time.



---

### Deliverables Required:

* Provide clean, well-commented, production-ready ES6 JavaScript code.
* Include necessary HTML/CSS boilerplate and CDN imports for Three.js and `GLTFLoader`.
* Ensure smooth error handling for model loading.