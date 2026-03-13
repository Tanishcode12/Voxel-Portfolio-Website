import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
const scene = new THREE.Scene();
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
const canvas = document.getElementById("experience-canvas");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
let character={
    instance:null,
    moveDistance:3,
    jumpHeight:1,
    isMoving:false,
    moveDuration:0.2
}
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true 
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.type= THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled= true;
renderer.toneMapping= THREE.AgXToneMapping;
renderer.toneMappingExposure=1
const modalContent={
    "board_legs001":{title: "About me & Education",
        content:`<p> Hi I am Tanish Thakur, I am a recent computer engineering graduate. In this page you will see my education, and in the following ones you will see my work experience and some notable projects I have done respectively!<br><p2><br><hr><br><h2>Education</h2><br><b style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;"><span>Bachelor of Engineering, Specialization Honours Computer Engineering</span><span style="font-weight: bold; white-space: nowrap;">Aug 2025</span></b><p>York University,Toronto</p>`,
        link:""
    },
    "board_legs":{title: "Experience",
        content:`<p> This section contains my work experience. The board prior will contain a little intro the myself and the one after this will contain some of my projects</p><br>
        <hr><h2>Work Experience</h2>
        <hr><br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>ML Research Intern, Indian Institute of Technology B.H.U – Varanasi, Uttar Pradesh</span><span style="font-weight: bold; white-space: nowrap;">May 2023 – July 2023</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Trained deep learning models in MATLAB on 300+ cardiac CT images, improving abnormality detection accuracy by 20%</li>
         <li style="margin-bottom: 5px;">Built reproducible data pipelines for dataset collection, preprocessing, and validation across experiments</li>
         <li style="margin-bottom: 5px;">Used Python for statistical analysis and visualization to guide model refinement; collaborated via GitHub</li></ul>
         <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Software Developer Intern, Gomukhi Enterprises Inc. – Markham, Ontario</span><span style="font-weight: bold; white-space: nowrap;">Aug 2021 – June 2023</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Developed AI-assisted tools for automated YouTube voiceovers and metadata generation, enabling scalable content production</li>
         <li style="margin-bottom: 5px;">Cleaned, validated, and structured large datasets in Excel to support ML workflows, improving processing efficiency by 30%</li>
         <li style="margin-bottom: 5px;">Built Python dashboards to track performance metrics and debug automation pipelines</li></ul>
         <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Collaborative Partner, York University, REACH Lab – Toronto, Ontario</span><span style="font-weight: bold; white-space: nowrap;">May 2023 – July 2023</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Co-led data-driven program design using survey and interview data to support first-generation student wellbeing</li>
         <li style="margin-bottom: 5px;">Analyzed survey data to inform program design for first-generation students</li>
         <li style="margin-bottom: 5px;">Coordinated and delivered workshops for 1,500+ students, translating insights into evidence-based resources</li></ul>`,
        link:""
    },
    "board_legs002":{title:"Projects",
        content:`<p> This section contains some of my notable projects , the link above will lead you to my github. The board prior will contain my work experies and the one before that will contain a little intro about me and my education</p><br>
        <hr><h2>Projects</h2>
        <hr><br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Automated Plant Watering System | Matlab, Java</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Designed Arduino-based system in Matlab using soil moisture sensors and water pump with real-time closed-loop feedback control, reducing water usage by 35% while maintaining soil moisture within 5% of target.</li>
        </ul>
        <br><b>App Review Sentiment Analysis | Python,JupyterLab,GroqAI</b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Built an end-to-end Python pipeline to scrape, preprocess, and analyze 5,000+ Google Play reviews for UFallAlert and competitor apps, applying TextBlob, VADER, and Groq AI (LLaMA3) for sentiment classification, model comparison, and validation against user ratings.</li>
         <li style="margin-bottom: 5px;">Identified 3 dominant user issues driving ~70% of negative and neutral feedback using LDA topic modeling (15 topics per app) and AI-assisted idea generation, enabling data-driven feature prioritization and actionable product improvement recommendations.</li>
        </ul>
         <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Virtual Robot Navigation with Lidar in ROS2 | Python</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Developed autonomous navigation system with real-time obstacle detection and avoidance, achieving 90% success rate in reaching goals without collisions.</li>
        </ul>
        <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Maze-Solving Algorithm for Virtual Robot in ROS2 | Python</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Implemented RRT algorithm with dynamic waypoint generation for safe path planning, achieving 100% collision-free navigation in simulations.</li>
        </ul>
        <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Autonomous Virtual Robot Road and Line Following with TensorFlow | Python, TensorFlow</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Trained TensorFlow-based system for lane tracking with 90% accuracy, integrating obstacle detection and smooth path navigation.</li>
        </ul>
        <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Netflix Data Analytics | Python, SQL, Scikit-learn</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Built a normalized SQLite database for 8,000+ Netflix titles and wrote 15+ SQL queries (JOIN, CASE, aggregation) to analyze content distribution, top countries, and director–actor collaborations.</li>
        <li style="margin-bottom: 5px;">Forecasted catalog growth using Linear Regression, tested duration differences by rating with ANOVA (p < 0.05), and applied TF-IDF + K-Means clustering to identify 5 thematic content clusters.</li>
        </ul>
        <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Student Productivity Analytics & Burnout Prediction | Python, SQL, Scikit-learn</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Designed and implemented an end-to-end student performance analytics system using Python, SQL, and scikit-learn to predict exam scores and detect high burnout risk, achieving R² of 0.82 for regression and F1-score of 0.88 for classification by engineering behavioral features and applying Random Forest models.</li>
        <li style="margin-bottom: 5px;">Developed interactive dashboards and data visualizations to analyze study, sleep, and digital habits, identifying the optimal study-sleep balance (“efficiency sweet spot”) that increased actionable academic recommendations for students by 25%, enabling personalized productivity insights.</li></ul>
         <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>High-Performance Cellular Automata Simulation Engine | Python, Numba, CuPy, Matplotlib</span></b>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Engineered a high-performance cellular automata engine (Python, NumPy, Numba, CuPy) simulating up to 1M cells, optimizing neighbor computation with vectorized convolution and parallel loops to reduce per-frame computation time by 80% while benchmarking CPU vs GPU performance.</li>
        </ul>
        <br><b style="display: flex;justify-content space-between; align-items:baseline; width: 100%"><span>Interactive Etch-A-Sketch Grid | HTML, CSS, JavaScript</span></b></ul>
        <ul style="list-style-type: disc; padding-left: 25px; margin-top: 10px;">
        <li style="margin-bottom: 5px;">Trained TensorFlow-based system for lane tracking with 90% accuracy, integrating obstacle detection and smooth path navigation.</li></ul>
        `,
        link:"https://github.com/Tanishcode12"
    },
    "extra":{title: "This Project",
        content:`<p>A game-like 3D portfolio built with Three.js where users explore an 
        interactive environment to view education, experience, and projects. Features 
        include a movable character, dynamic camera modes, day/night transitions with 
        animated celestial bodies, object raycasting for interactive boards, and 
        responsive controls for desktop and mobile devices.<br>
        The character motion can be controlled by the arrow keys or w,a,s,d keys on laptop
        for mobile devices there will be ui's for arrows to allow them to control the character.<br>
        The top nav bar will allow the users to download my resume,view my about me section
        ,education and experience. They can use the mail icon to get my email and the link icon
        for my linkedin profile. <br>The sun icon just below will let the user change from day to night mode
        and the lock icon below will let them choose between free camera and character perspective.<br>
        Alternatively the character to the boards in the 3D environment and click on them for my about me,education,experience and projects respectively.</p>`,
        link:""
    },
}
const modal= document.querySelector(".modal")
const modalTitle= document.querySelector(".modal-title")
const modalProjectDescription= document.querySelector(".modal-project-description")
const modalExitButton= document.querySelector(".modal-exit-button")
const modalVisitButton= document.querySelector(".modal-visit-button")
function showModal(id){
    const content= modalContent[id];
    if (content){
        modalTitle.textContent=content.title;
        modalProjectDescription.innerHTML=content.content
        if(content.link){
            modalVisitButton.href = content.link
            modalVisitButton.classList.remove('hidden')
        }
        else{
            modalVisitButton.classList.add('hidden')
        }
        modal.classList.toggle("hidden")
    }
}
function hideModal(){
    modal.classList.toggle("hidden")
}
let intersectObject=""
const intersectObjects=[];
const intersectObjectsNames=["board_legs","board_legs001","board_legs002"]
const loader = new GLTFLoader();
new RGBELoader()
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/venice_sunset_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    });
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 8000;
const starDistance = 700; 
const posArray = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = starDistance * Math.sin(phi) * Math.cos(theta);
    const y = starDistance * Math.sin(phi) * Math.sin(theta);
    const z = starDistance * Math.cos(phi);
    posArray[i * 3] = x;
    posArray[i * 3 + 1] = y;
    posArray[i * 3 + 2] = z;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const starsMaterial = new THREE.PointsMaterial({
    size: 1.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0, 
    sizeAttenuation: false ,
    fog: false 
});
const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starsMesh);
const skyGeo = new THREE.SphereGeometry(650, 32, 32);
const loader_sky = new THREE.TextureLoader();
const skyTexture = loader_sky.load('./1-converted-from-webp.jpg'); 
const skyMat = new THREE.MeshBasicMaterial({
    map: skyTexture,
    side: THREE.BackSide, 
    transparent: true,
    opacity: 1, // Starts visible for Day mode
    fog: false
});
const skyMesh = new THREE.Mesh(skyGeo, skyMat);
scene.add(skyMesh);
// Sun and Moon Group (to rotate them together)
const celestialGroup = new THREE.Group();
scene.add(celestialGroup);
const sunGeo = new THREE.SphereGeometry(15, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffddaa });
const sunMesh = new THREE.Mesh(sunGeo, sunMat);
sunMesh.position.set(0, 200, -400); // High and far away
celestialGroup.add(sunMesh);
const moonGeo = new THREE.SphereGeometry(10, 32, 32);
const moonMat = new THREE.MeshBasicMaterial({ color: 0xccddee });
const moonMesh = new THREE.Mesh(moonGeo, moonMat);
moonMesh.position.set(0, -200, 400); // Opposite side of the Sun
celestialGroup.add(moonMesh);
const collidableObjects = []; // Array to store things that block the character
loader.load('./evenbetterportfolioforweb.glb', function (gltf) {
    gltf.scene.traverse(child => {
        const isLeg = intersectObjectsNames.includes(child.name);
        const isCollider = child.name.toLowerCase().includes("collider");
        if (isLeg || isCollider) {
            collidableObjects.push(child);
            if (isLeg) intersectObjects.push(child);
            if (isCollider) {
                child.visible = false;
            }
        }
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        if (child.name === "Character") {
            character.instance = child;
        }
    });
    scene.add(gltf.scene);
}, undefined, console.error);
const sunlight = new THREE.DirectionalLight(0xFFFFFF, 1); 
sunlight.position.set(-140, 180, 0);
sunlight.castShadow = true; 
scene.add(sunlight);
sunlight.target.position.set(-90,0,0)
sunlight.shadow.mapSize.width=4096;
sunlight.shadow.mapSize.height=4096;
sunlight.shadow.camera.left = -260;
sunlight.shadow.camera.right = 280;
sunlight.shadow.camera.top = 240;
sunlight.shadow.camera.bottom = -240;
sunlight.shadow.camera.near = 0.5;
sunlight.shadow.camera.far = 500;
sunlight.shadow.normalBias=0.2
sunlight.shadow.mapSize.width = 2048;
sunlight.shadow.mapSize.height = 2048;
const shadowHelper = new THREE.CameraHelper(sunlight.shadow.camera);
scene.add(shadowHelper);
const helper = new THREE.DirectionalLightHelper(sunlight, 5);
scene.add(helper);
const light = new THREE.AmbientLight( 0x404040,10 ); // soft white light
scene.add( light );
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 168.53493884309344;
camera.position.x=286.55327688350013 ;
camera.position.y=147.88791849054408
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.touchEvents = true; 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
modalExitButton.addEventListener("click",hideModal)
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
});
function onPointerMove(event){
    pointer.x = (event.clientX / sizes.width)*2-1;
    pointer.y = -(event.clientY / sizes.height) * 2 + 1;
}
function onClick() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(intersectObjects, true);
    if (intersects.length > 0) {
        let target = intersects[0].object;
        while (target && !modalContent[target.name]) {
            target = target.parent;
        }
        if (target && modalContent[target.name]) {
            showModal(target.name);
        }
    }
}
function moveCharacter(targetPosition,targetRotation){
    character.isMoving=true;
    const t1=gsap.timeline({onComplete:()=>{
        character.isMoving=false;
    }});
    t1.to(character.instance.position,{
        x:targetPosition.x,
        z:targetPosition.z,
        duration:character.moveDuration})
    t1.to(character.instance.rotation,{
        y:targetRotation,
        duration:character.moveDuration},0)
    t1.to(character.instance.position,{
        y:character.instance.position.y+character.jumpHeight,
        duration:character.moveDuration/2,
        yoyo:true,
        repeat:1},0)
}
function checkCollision(targetPosition) {
    if (!character.instance) return false;
    const direction = new THREE.Vector3()
        .subVectors(targetPosition, character.instance.position)
        .normalize();
    const rayOrigin = character.instance.position.clone().add(new THREE.Vector3(0, 0.5, 0));
    raycaster.set(rayOrigin, direction);
    const hits = raycaster.intersectObjects(collidableObjects, true);
    if (hits.length > 0 && hits[0].distance < character.moveDistance) {
        return true;
    }
    return false;
}
function updateGravity() {
    if (!character.instance || character.isMoving) return;
    const rayOrigin = character.instance.position.clone().add(new THREE.Vector3(0, 5, 0));
    const downRay = new THREE.Raycaster(rayOrigin, new THREE.Vector3(0, -1, 0));
    const terrainHits = downRay.intersectObjects(scene.children, true);
    const actualFloor = terrainHits.find(hit => {
        let isCharacter = false;
        hit.object.traverseAncestors(ancestor => {
            if (ancestor === character.instance) isCharacter = true;
        });
        return !isCharacter && hit.object !== character.instance && hit.object.visible === true;
    });
    if (actualFloor) {
        const heightOffset = 5.0;
        character.instance.position.y = actualFloor.point.y + heightOffset;
    }
}
function handleMoveInput(direction) {
    if (!character.instance || character.isMoving) return;

    const targetPosition = character.instance.position.clone();
    let targetRotation = 0;

    switch (direction) {
        case "up":
            targetPosition.x -= character.moveDistance;
            targetRotation = -Math.PI / 2;
            break;
        case "down":
            targetPosition.x += character.moveDistance;
            targetRotation = Math.PI / 2;
            break;
        case "left":
            targetPosition.z += character.moveDistance;
            targetRotation = -Math.PI;
            break;
        case "right":
            targetPosition.z -= character.moveDistance;
            targetRotation = 0;
            break;
    }

    if (!checkCollision(targetPosition)) {
        moveCharacter(targetPosition, targetRotation);
    }
}
window.addEventListener("pointermove",onPointerMove)
function onSceneClick(event) {
    if (!modal.classList.contains('hidden')) return;
    raycaster.setFromCamera(pointer, camera);
    const boardIntersects = raycaster.intersectObjects(intersectObjects, true);
    if (boardIntersects.length > 0) {
        return; 
    }
    const allIntersects = raycaster.intersectObjects(scene.children, true);
    const floorIntersect = allIntersects.find(hit => 
        hit.object.name.toLowerCase().includes("floor") || 
        hit.object.name.toLowerCase().includes("ground")
    );
    if (floorIntersect && character.instance && !character.isMoving) {
        const targetPos = floorIntersect.point.clone();
        // Calculate basic rotation to face the click
        const angle = Math.atan2(
            targetPos.x - character.instance.position.x, 
            targetPos.z - character.instance.position.z
        );
        moveCharacter(targetPos, angle + Math.PI);
    }
}

window.addEventListener("click", (e) => {
    onClick(e);      // board click logic
    //onSceneClick(e); //  movement logic
});
window.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case "w": case "arrowup": handleMoveInput("up"); break;
        case "s": case "arrowdown": handleMoveInput("down"); break;
        case "a": case "arrowleft": handleMoveInput("left"); break;
        case "d": case "arrowright": handleMoveInput("right"); break;
    }
});
const mobileControls = {
    "ctrl-up": "up",
    "ctrl-down": "down",
    "ctrl-left": "left",
    "ctrl-right": "right"
};

Object.entries(mobileControls).forEach(([id, dir]) => {
    const btn = document.getElementById(id);
    if (btn) {
        // Use pointerdown for faster response on mobile
        btn.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            handleMoveInput(dir);
        });
    }
});
let isNight = false;
const themeBtn = document.getElementById('theme-toggle');
function toggleTheme() {
    isNight = !isNight;
    document.body.classList.toggle('night-mode');
    gsap.to(celestialGroup.rotation, {
        x: isNight ? Math.PI : 0,
        duration: 2,
        ease: "power2.inOut"
    });
    gsap.to(sunlight.color, {
        r: isNight ? 0.6 : 1,
        g: isNight ? 0.7 : 1,
        b: isNight ? 1 : 1,
        duration: 1.5
    });
    gsap.to(light.color, {
        r: isNight ? 0.12 : 0.25, 
        g: isNight ? 0.12 : 0.25,
        b: isNight ? 0.25 : 0.25,
        duration: 1.5
    });
    gsap.to(renderer, { toneMappingExposure: isNight ? 0.5 : 1, duration: 1.5 });
    gsap.to(starsMaterial, { opacity: isNight ? 1 : 0, duration: 1.5 });
    gsap.to(scene.background, {
        r: isNight ? 0.01 : 0,
        g: isNight ? 0.01 : 0,
        b: isNight ? 0.02 : 0,
        duration: 1.5
    });
    gsap.to(skyMat, {
        opacity: isNight ? 0 : 1,
        duration: 2
    });
    gsap.to(starsMaterial, {
        opacity: isNight ? 1 : 0,
        duration: 2
    });
    gsap.to(skyMat, { opacity: isNight ? 0 : 1, duration: 2 });
    gsap.to(starsMaterial, { opacity: isNight ? 1 : 0, duration: 2 });
    gsap.to(sunlight.color, {
        r: isNight ? 0.6 : 1,
        g: isNight ? 0.7 : 1,
        b: isNight ? 1 : 1,
        duration: 1.5
    });
    gsap.to(renderer, { toneMappingExposure: isNight ? 0.5 : 1, duration: 1.5 });
}
themeBtn.addEventListener('click', toggleTheme);
scene.background = new THREE.Color(0x000000);// Initialize background color so GSAP can animate it
let isFreeCam = false;
const cameraBtn = document.getElementById('camera-toggle');
const lockIcon = cameraBtn.querySelector('.lock-icon');
const freeIcon = cameraBtn.querySelector('.free-icon');

cameraBtn.addEventListener('click', () => {
    isFreeCam = !isFreeCam;
    cameraBtn.classList.toggle('free-mode');
    lockIcon.classList.toggle('hidden');
    freeIcon.classList.toggle('hidden');

    if (isFreeCam) {
        controls.enablePan = true; 
        controls.maxDistance = 1000;
    } else {
        controls.enablePan = false; 
        controls.maxDistance = 300; 
    }
});
function animate(time) {
    raycaster.setFromCamera(pointer,camera);
    const intersects = raycaster.intersectObjects(intersectObjects, true);  
    intersectObjects.forEach(obj => {
        if (obj.material) {
            obj.material.emissiveIntensity = 0;
            obj.material.emissive = new THREE.Color(0x000000); 
        }
    });
    if (intersects.length > 0) {
        document.body.style.cursor = "pointer";
                const hoveredBoard = intersects[0].object;
        if (isNight) {
            if (hoveredBoard.material) {
                hoveredBoard.material.emissive = new THREE.Color(0x99aaff);
                hoveredBoard.material.emissiveIntensity = 0.5;
            }
            starsMesh.rotation.y += 0.0001;
            starsMesh.rotation.x += 0.00005;
        } else {
            if (hoveredBoard.material) {
                hoveredBoard.material.emissiveIntensity = 0;
            }
            if (skyTexture) {
                skyTexture.offset.x += 0.00005;
            }
        }
    } else {
        document.body.style.cursor = "default";
    }
if (character.instance) {
        if (!isFreeCam) {
            // --- FOLLOW MODE ---
            const cameraDistance = new THREE.Vector3(100, 90, 100);
            const targetCameraPos = character.instance.position.clone().add(cameraDistance);
            
            camera.position.lerp(targetCameraPos, 0.05);

            const lookAtTarget = character.instance.position.clone().add(new THREE.Vector3(0, 3, 0));
            controls.target.lerp(lookAtTarget, 0.05);
        } else {
            // --- FREE CAM MODE ---
        }
    }

    updateGravity();
    controls.update(); // This must run for both modes
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
// Add this at the very end of your main.js file
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        showModal(modalId);
    });
});


const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active'); // Added this line to swap symbols
});

// Close menu when a navigation button is clicked
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active'); // Reset button to hamburger
    });
});

