// ----- Settings ----- //

// Camera settings.
let CAMERA_X = 0;
let CAMERA_Y = 3;
let CAMERA_Z = 7;
let CAMERA_FOV = 75;
let CAMERA_NEAR = 0.1;
let CAMERA_FAR = 1000;

// Dimensions.
let WINDOW_ASPECT = window.innerWidth / window.innerHeight;


// ----- Functions ----- //

// Creates and returns the camera.
function setupCamera () {

	let camera = new THREE.PerspectiveCamera(CAMERA_FOV, WINDOW_ASPECT,
		CAMERA_NEAR, CAMERA_FAR);

	camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);

	return camera;

}

// Sets up and launches the application.
function setup () {

	let scene = new THREE.Scene();
	let camera = setupCamera();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
