// ----- Settings ----- //

// Camera settings.
var CAMERA = {
	x: 0,
	y: 7,
	z: 7,
	fov: 75,
	near: 0.1,
	far: 1000
};

// Dimensions.
var DISPLAY = {
	width: window.innerWidth,
	height: window.innerHeight
};

// Planets.
var BODIES = {
	theSun: {
		colour: 0xffff00,
		position: {x: 0, y: 0, z: 0},
		radius: 1
	},
	mercury: {
		colour: 0xb4b4b4,
		position: {x: 3, y: 3, z: 3},
		radius: 1
	}
};


// ----- Functions ----- //

// Creates and returns the camera.
function setupCamera (settings, display) {

	var aspectRatio = display.width / display.height;
	var camera = new THREE.PerspectiveCamera(settings.fov, aspectRatio,
		settings.near, settings.far);

	camera.position.set(settings.x, settings.y, settings.z);

	return camera;

}

// Builds the renderer, adds it to the page, and returns it.
function setupRenderer (display) {

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(display.width, display.height);

	document.body.appendChild(renderer.domElement);

	return renderer;

}

// Creates and returns a celestial body from a material and its properties.
function celestialBody (info) {

	var geometry = new THREE.SphereGeometry(info.radius, 32, 32);
	var material = new THREE.MeshBasicMaterial({color: info.colour});

	var pivot = new THREE.Object3D();
	var body = new THREE.Mesh(geometry, material);

	body.position.set(info.position.x, info.position.y, info.position.z);
	pivot.add(body);

	return pivot;

}

// Adds celestial bodies to the scene.
function addBodies (scene, bodies) {

	for (var body in bodies) {

		var newBody = celestialBody(bodies[body]);
		scene.add(newBody);

	}

}

// Creates the render function and begins rendering.
function startRender (components) {	

	function render () {
		requestAnimationFrame(render);
		components.controls.update();
		components.renderer.render(components.scene, components.camera);
	}

	render();

}

// Sets up and launches the application.
function setup () {

	var components = {
		scene: new THREE.Scene(),
		camera: setupCamera(CAMERA, DISPLAY),
		controls: new THREE.OrbitControls(camera),
		renderer: setupRenderer(DISPLAY)
	};

	addBodies(scene, BODIES);

	startRender(components);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
