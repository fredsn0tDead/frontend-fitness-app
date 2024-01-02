import React from 'react'
import * as THREE from 'three';
import { useEffect } from 'react';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export const Threed = () => {
    useEffect(() => {
        // Set up the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('3d-container').appendChild(renderer.domElement);
    
        // Create barbell plate geometry
        const createBarbellPlate = (color, x, y) => {
          const plateGeometry = new THREE.BoxGeometry(2, 0.2, 2);
          const plateMaterial = new THREE.MeshBasicMaterial({ color });
          const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
          plateMesh.position.set(x, y, 0);
          scene.add(plateMesh);
    
          return plateMesh;
        };
    
        // Create barbell plates
        const plate1 = createBarbellPlate(0xff0000, -3, 0);
        const plate2 = createBarbellPlate(0x00ff00, 0, 0);
        const plate3 = createBarbellPlate(0x0000ff, 3, 0);
    
        // Create text
        const createText = (text, x, y, z) => {
          const fontLoader = new  FontLoader();
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          
          fontLoader.load('fonts/helvetiker_bold.typeface.json', (font) => {
            const textGeometry = new TextGeometry(text, {
              font,
              size: 0.5,
              height: 0.1,
            });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(x, y, z);
            scene.add(textMesh);
          });
        };
    
        // Create text elements
        createText('Exercise Recommender', -4, -3, 0);
        createText('Exercise Log', 0, -3, 0);
        createText('Previous Workouts', 4, -3, 0);
    
        // Set camera position
        camera.position.z = 10;
    
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
    
          // Move barbell plates up and down
          plate1.position.y = Math.sin(Date.now() * 0.001) * 2;
          plate2.position.y = Math.sin(Date.now() * 0.001 + 2) * 2;
          plate3.position.y = Math.sin(Date.now() * 0.001 + 4) * 2;
    
          renderer.render(scene, camera);
        };
    
        animate();
    
        // Clean up on component unmount
        return () => {
          document.getElementById('3d-container').removeChild(renderer.domElement);
        };
      }, []);
    
      return <div id="3d-container" />;
}
