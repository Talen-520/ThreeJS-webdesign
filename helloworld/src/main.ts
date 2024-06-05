import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import * as THREE from 'three';

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