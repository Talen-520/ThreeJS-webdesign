import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; //allow move around to scene with mouse
// handle all background and light
const scene = new THREE.Scene();

//camera type: ArrayCamera, Camera, CubeCamera, OrthographicCamera, PerspectiveCamera StereoCamera
// PerspectiveCamera(view degree/fov, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// render the scene with the camera
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg') as HTMLCanvasElement
});


renderer.setPixelRatio(window.devicePixelRatio);
// set the size of the renderer to windows size
renderer.setSize(window.innerWidth, window.innerHeight);
//  set camera position
camera.position.setZ(30);;

renderer.render(scene, camera);

// TorusGeometry(radius, tube, radialSegments, tubularSegments), vector define 
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// Material
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// Mesh
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff); 
pointLight.position.set(5, 5, 5); 

const ambientLight = new THREE.AmbientLight(0xffffff); // light up everthing
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); // (light, size) display light direction
const gridHelper = new THREE.GridHelper(200, 50); //(size, divisions) a vertical line
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement); // allow you move mouse
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    renderer.render(scene, camera);

}

Array(200).fill(0).forEach(addStar);
//background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// box
const boxtexture = new THREE.TextureLoader().load('texture.jpg');
const box = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: boxtexture })
);
scene.add(box);

// moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture, 
        normalMap: normalTexture
    })
);
moon.position.set(10, 10, -50);
scene.add(moon);

// scrolling
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    box.rotation.y += 0.01;
    box.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;


animate();

