// ----- Settings ----- //

// Camera settings.
var CAMERA_X = 0;
var CAMERA_Y = 3;
var CAMERA_Z = 7;
var CAMERA_FOV = 75;
var CAMERA_NEAR = 0.1;
var CAMERA_FAR = 1000;

// Dimensions.
var DISPLAY_WIDTH = window.innerWidth;
var DISPLAY_HEIGHT = window.innerHeight;
var PLANET_RADIUS = 1;

// ----- Functions ----- //

// Creates and returns the camera.
function setupCamera () {

	var aspectRatio = DISPLAY_WIDTH / DISPLAY_HEIGHT;
	var camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspectRatio,
		CAMERA_NEAR, CAMERA_FAR);

	camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);

	return camera;

}

// Builds the renderer, adds it to the page, and returns it.
function setupRenderer () {

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

	document.body.appendChild(renderer.domElement);

	return renderer;

}

// Creates and returns a celestial body from a geometry and a material.
function celestialBody (geometry, meterial, position) {

	var pivot = new THREE.Object3D();
	var body = new THREE.Mesh(geometry, meterial);

	body.position.set.apply(this, position);
	pivot.add(body);

	return pivot;

}

function addPlanets (scene) {

	var geometry = new THREE.SphereGeometry(PLANET_RADIUS, 32, 32);
	var material = new THREE.MeshBasicMaterial({color: 0xffff00});

	var planetOne = celestialBody(geometry, material, [0, 0, 0]);
	scene.add(planetOne);

}

// Creates the render function and begins rendering.
function startRender (scene, camera, controls, renderer) {	

	function render () {
		requestAnimationFrame(render);
		controls.update();
		renderer.render(scene, camera);
	}

	render();

}

// Sets up and launches the application.
function setup () {

	var scene = new THREE.Scene();
	var camera = setupCamera();
	var controls = new THREE.OrbitControls(camera);
	var renderer = setupRenderer();

	addPlanets(scene);

	startRender(scene, camera, controls, renderer);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
