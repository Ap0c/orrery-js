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

// Planets.
var BODIES = {
	theSun: {
		colour: 0xffff00,
		position: [0, 0, 0],
		radius: 1
	}
};

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

// Creates and returns a celestial body from a material and its properties.
function celestialBody (info) {

	var geometry = new THREE.SphereGeometry(info.radius, 32, 32);
	var material = new THREE.MeshBasicMaterial({color: info.colour});

	var pivot = new THREE.Object3D();
	var body = new THREE.Mesh(geometry, material);

	body.position.set.apply(this, info.position);
	pivot.add(body);

	return pivot;

}

// Adds celestial bodies to the scene.
function addBodies (scene) {

	for (var body in BODIES) {

		var newBody = celestialBody(BODIES[body]);
		scene.add(newBody);

	}

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

	addBodies(scene);

	startRender(scene, camera, controls, renderer);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
