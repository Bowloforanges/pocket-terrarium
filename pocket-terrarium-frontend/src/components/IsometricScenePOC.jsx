import * as THREE from "three";
import { useEffect } from "react";

const IsometricScenePOC = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // ambient
    scene.add(new THREE.AmbientLight(0x444444));

    // light
    const light = new THREE.PointLight(0xffffff, 0.8);
    light.position.set(0, 50, 50);
    scene.add(light);

    // Set up camera
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000
    );

    camera.position.set(20, 20, 20); // all components equal
    camera.lookAt(scene.position); // or the origin

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById("isometric-scene-container")
      .appendChild(renderer.domElement);

    // Add a grid to the scene
    const gridGeometry = new THREE.PlaneGeometry(100, 100, 49, 49);
    const gridMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      opacity: 0.05,
      transparent: true,
    });

    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.order = "YXZ";
    grid.rotation.y = -Math.PI / 2;
    grid.rotation.x = -Math.PI / 2;
    scene.add(grid);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the cube or perform other animations here
      //cube.rotation.x += 0.03;
      //cube.rotation.y += 0.02;
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

export default IsometricScenePOC;
