import * as THREE from "three";
import { useEffect } from "react";

const IsometricScene = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Set up the camera
    /*const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );*/

    camera.position.set(0, 0, 2);
    camera.rotation.set(0.5, 0.5, 0);

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById("isometric-scene-container")
      .appendChild(renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the cube or perform other animations here
      cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the scene when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      document
        .getElementById("isometric-scene-container")
        .removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array to run this effect once

  return (
    <div
      id="isometric-scene-container"
      style={{ width: "100%", height: "100vh" }}
    >
      {/* The 3D scene will be rendered here */}
    </div>
  );
};

export default IsometricScene;
