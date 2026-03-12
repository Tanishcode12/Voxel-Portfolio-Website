# Interactive 3D Portfolio Website
An interactive 3D portfolio experience built using Three.js, where visitors explore a small virtual world to learn about my education, experience, and projects.
Instead of traditional scrolling, users move a character through the environment and interact with boards that open detailed information modals.
The project combines 3D graphics, UI design, and web development to create a portfolio that feels closer to a mini game than a static website.
# Demo
You can explore the live website here:
[CLICK ME](https://tanishcode12.github.io/Voxel-Portfolio-Website/)
# Features
## 3D Interactive Environment
- Built using Three.js WebGL renderer
- Custom GLTF 3D world and character
- Real-time lighting and shadows
- HDR environment reflections
## Character Navigation
- Character movement using:
   - Keyboard (WASD / Arrow Keys)
   - Mobile directional controls
- Jump animation during movement using GSAP
- Collision detection with scene objects
- Gravity system for terrain alignment
## Interactive Information Board
- Raycasting system detects board clicks
- Clicking boards opens modal windows containing:
   - Education
   - Work experience
   - Projects
- Navigation bar provides quick access to the same content
## Dynamic Day / Night Cycle
- Toggle between day and night modes
- Animated sun and moon rotation
- Skybox transitions
- Dynamic lighting changes
- Starfield appears during night mode
## Camera System
- Two camera modes:
   - Follow Mode
      - Camera automatically tracks the character
      - Smooth interpolation for cinematic movement
   - Free Camera Mode
      - OrbitControls enabled
      - Full scene exploration
## UI & UX Features
- Animated modals with scrollable content
- Responsive layout for mobile devices
- Glassmorphism-inspired UI
- Custom theme toggle
- Mobile movement controls
# Technologies Used
- Three.js – 3D rendering and scene management
- JavaScript (ES Modules) – Application logic
- GSAP – Animation system
- GLTFLoader – Loading 3D models
- RGBELoader – HDR environment lighting
- OrbitControls – Camera interaction
- HTML5 & CSS3 – UI and layout
# Controls
| Action | Key |
| :--- | :---: | 
| Move Forward | W,UP arrow key, Up arrow ui on screen | 
| Move Backward | S,Down arrow key, down arrow ui on screen | 
| Move Left | A,Left arrow key, Left arrow ui on screen | 
| Move Right | D,Right arrow key, Right arrow ui on screen | 
| Toggle Theme | Sun/Moon Button | 
| Camera Mode | Lock/Airplane Button | 
# Key Technical Concepts Implemented
- Raycasting for 3D interaction
- Scene graph traversal for object detection
- Physics-like gravity and collision handling
- Real-time lighting and shadow mapping
- Animated environment transitions
- Responsive UI overlay on WebGL canvas
