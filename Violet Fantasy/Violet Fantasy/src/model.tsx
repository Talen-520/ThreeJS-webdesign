import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef } from 'react';

const Model = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000); //adjust zoom in distance with 45
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount?.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Intense white light
    directionalLight.position.set(5, 5, 5); // Position the light source
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer;

    loader.load(
      'cloud_station.glb', // Path to the model file
      function (gltf) {
        const model = gltf.scene;

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const boxCenter = box.getCenter(new THREE.Vector3());
        model.position.x -= boxCenter.x;
        model.position.y -= boxCenter.y;
        model.position.z -= boxCenter.z;

        scene.add(model);

        // Set up animation mixer and play animations
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;

    camera.position.set(0, 1, 10); // Set initial camera position

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default Model;
