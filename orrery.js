// ----- Settings ----- //

// Camera settings.
var CAMERA = {
	x: 120,
	y: 120,
	z: 200,
	leftRight: 180,
	near: 0.1,
	far: 1000
};

// Dimensions.
var DISPLAY = {
	width: window.innerWidth,
	height: window.innerHeight
};

// Properties of the Sun.
var SUN = {
	colour: 0xffff00,
	position: {x: 0, y: 0, z: 0},
	radius: 20
};

// Properties of the planets.
var PLANETS = {
	mercury: {
		colour: 0xb4b4b4,
		position: {x: 30, y: 0, z: 0},
		radius: 0.4,
		period: 2
	},
	venus: {
		colour: 0xfac8b4,
		position: {x: 0, y: 0, z: 35},
		radius: 0.9,
		period: 6
	},
	earth: {
		colour: 0x28d2ff,
		position: {x: -40, y: 0, z: 0},
		radius: 1,
		period: 10
	},
	mars: {
		colour: 0xff5a1e,
		position: {x: 0, y: 0, z: -45},
		radius: 0.5,
		period: 20
	},
	jupiter: {
		colour: 0xf07828,
		position: {x: 65, y: 0, z: 0},
		radius: 11,
		period: 120
	},
	saturn: {
		colour: 0xdca028,
		position: {x: 0, y: 0, z: 100},
		radius: 9.5,
		period: 300
	},
	uranus: {
		colour: 0xb4c8f0,
		position: {x: -130, y: 0, z: 0},
		radius: 4,
		period: 840
	},
	neptune: {
		colour: 0x0032f0,
		position: {x: 0, y: 0, z: -150},
		radius: 3.9,
		period: 1650
	}
};

var FPS = 60;


// ----- Functions ----- //

// Creates and returns the camera.
function setupCamera (settings, display) {

	var topBottom = settings.leftRight * display.height / display.width;
	var camera = new THREE.OrthographicCamera(-settings.leftRight, settings.leftRight,
		topBottom, -topBottom, settings.near, settings.far);

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

// Creates and returns a planet from its properties.
function createPlanet (info) {

	var geometry = new THREE.SphereGeometry(info.radius, 32, 32);
	var material = new THREE.MeshLambertMaterial({color: info.colour});

	var pivot = new THREE.Object3D();
	var planet = new THREE.Mesh(geometry, material);

	planet.position.set(info.position.x, info.position.y, info.position.z);
	pivot.add(planet);

	return pivot;

}

// Adds planets to the scene.
function addPlanets (scene, planets) {

	var meshes = {};

	for (var planet in planets) {

		var planetMesh = createPlanet(planets[planet]);
		scene.add(planetMesh);
		meshes[planet] = planetMesh;

	}

	return meshes;

}

// Creates the Sun and adds it to the scene.
function createSun (scene, info) {

	var geometry = new THREE.SphereGeometry(info.radius, 32, 32);
	var material = new THREE.MeshLambertMaterial({color: info.colour, emissive: 0xffff00});

	var theSun = new THREE.Mesh(geometry, material);
	theSun.position.set(info.position.x, info.position.y, info.position.z);
	scene.add(theSun);

}

// Returns an object with the orbital increments per frame for each planet.
function calcOrbits (planets) {

	var orbits = {};

	for (var planet in planets) {

		var properties = planets[planet];

		if (properties.period) {
			orbits[planet] = Math.PI / properties.period / FPS;
		}

	}

	return orbits;

}

// Creates a light source at the Sun, and a general ambient light.
function createLights (scene) {

	var sunLight = new THREE.PointLight(0xffffff, 1.2, 0);
	var ambientLight = new THREE.AmbientLight(0x999999);

	sunLight.position.set(0, 0, 0);
	scene.add(sunLight);
	scene.add(ambientLight);

}

// Increments the orbit of each planet.
function updateOrbits (meshes, orbits) {

	for (var orbit in orbits) {

		meshes[orbit].rotation.y += orbits[orbit];

	}

}

// Creates the render function and begins rendering.
function startRender (components, meshes, orbits) {	

	function render () {
		requestAnimationFrame(render);
		components.controls.update();
		updateOrbits(meshes, orbits);
		components.renderer.render(components.scene, components.camera);
	}

	render();

}

// Sets up and launches the application.
function setup () {

	var components = {
		scene: new THREE.Scene(),
		camera: setupCamera(CAMERA, DISPLAY),
		renderer: setupRenderer(DISPLAY)
	};

	components.controls = new THREE.OrbitControls(components.camera);

	var orbits = calcOrbits(PLANETS);
	var meshes = addPlanets(components.scene, PLANETS);

	createSun(components.scene, SUN);
	createLights(components.scene);

	startRender(components, meshes, orbits);

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
