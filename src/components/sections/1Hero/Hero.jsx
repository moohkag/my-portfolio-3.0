/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { NavContextValue } from "../../../contexts/NavContext";

const Hero = () => {
  //variables
  const canvasRef = useRef(null);
  const { heroRef } = NavContextValue();

  //functions
  useEffect(() => {
    //scene
    const scene = new THREE.Scene();

    //mesh
    const geometry = new THREE.SphereGeometry(4.5, 100, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xfdfdfd,
      roughness: 0.55,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y -= 1; //zoom

    //camera
    const camera = new THREE.PerspectiveCamera(
      75,
      document.documentElement.clientWidth /
        document.documentElement.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 1;
    camera.aspect =
      document.documentElement.clientWidth /
      document.documentElement.clientHeight;
    camera.updateProjectionMatrix();

    //lighting
    const light = new THREE.PointLight(0xfdfdfd, 1, 90);
    light.position.set(0, 25, -30); //position
    //-30 to -10

    // create an ambient light with a color and intensity
    const ambientLight = new THREE.AmbientLight(0x020202, 1);
    scene.add(ambientLight);

    //renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
    renderer.setClearColor(0x020202, 1);

    //add onto the scene
    scene.add(mesh);
    scene.add(light);

    canvasRef.current.appendChild(renderer.domElement);

    //render the scene
    renderer.render(scene, camera);

    // light reveal animation
    const animate = (e) => {
      //position
      if (light.position.z < -5) {
        light.position.z += 0.2; //speed
        scene.add(light);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
    };
    animate();

    //1. resizing function
    function handleWindowResize() {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;

      if (window.innerWidth < 440) {
        camera.position.z = 13; //zoom
      } else if (window.innerWidth < 680) {
        camera.position.z = 11; //zoom
      } else {
        camera.position.z = 8; //zoom
      }
      camera.aspect = width / height;
      renderer.setSize(width, height);

      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    //2. mousemove effect function
    function sphereMouseEffect(e) {
      //position
      let fromX = -8;
      let toX = 8;
      let mousePositionPercentage = e.clientX / window.innerWidth;
      let lightPosition = fromX + (toX - fromX) * mousePositionPercentage;

      //position
      let fromZ = -30;
      let toZ = 5;
      let mousePositionY = e.clientY / window.innerHeight;
      let lightPositionZ = fromZ + (toZ - fromZ) * mousePositionY + 10;

      let startTime = new Date().getTime(); // Get the current time in milliseconds
      let duration = 5000;

      // Define a function to update the light's position based on elapsed time
      function updatePosition() {
        let elapsedTime = new Date().getTime() - startTime; // Calculate elapsed time
        let t = Math.min(1, elapsedTime / duration); // Calculate progress as a value between 0 and 1

        // Interpolate between the current position and the target position using the progress value
        light.position.x =
          light.position.x + (lightPosition - light.position.x) * t;
        light.position.z =
          light.position.z + (lightPositionZ - light.position.z) * t;

        renderer.render(scene, camera);

        if (t < 1) {
          // If the animation is not complete, request the next frame of the animation
          requestAnimationFrame(updatePosition);
        }
      }
      // Start the animation
      requestAnimationFrame(updatePosition);
    }

    //activate
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    setTimeout(() => {
      canvasRef.current.addEventListener("mousemove", sphereMouseEffect);
    }, 1600); //pause time

    return () => {
      canvasRef.current?.removeChild(renderer.domElement);
      canvasRef.current.removeEventListener("mousemove", sphereMouseEffect);
    };
  }, []);

  return (
    <section className="main-section" id="hero-section" ref={heroRef}>
      <div ref={canvasRef}></div>
    </section>
  );
};

export default Hero;
