// ----- Settings ----- //

// Camera settings.
let CAMERA_X = 0;
let CAMERA_Y = 3;
let CAMERA_Z = 7;
let CAMERA_FOV = 75;
let CAMERA_NEAR = 0.1;
let CAMERA_FAR = 1000;

// Dimensions.
let DISPLAY_WIDTH = window.innerWidth;
let DISPLAY_HEIGHT = window.innerHeight;

// ----- Functions ----- //

// Creates and returns the camera.
function setupCamera () {

	let aspectRatio = DISPLAY_WIDTH / DISPLAY_HEIGHT;
	let camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspectRatio,
		CAMERA_NEAR, CAMERA_FAR);

	camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);

	return camera;

}

// Builds the renderer, adds it to the page, and returns it.
function setupRenderer () {

	let renderer = new THREE.WebGLRenderer();
	renderer.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

	document.body.appendChild(renderer.domElement);

	return renderer;

}

// Sets up and launches the application.
function setup () {

	let scene = new THREE.Scene();
	let camera = setupCamera();
	let controls = new THREE.OrbitControls(camera);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
