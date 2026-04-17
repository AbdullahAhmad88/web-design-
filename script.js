import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

// ==========================
// SCENE SETUP
// ==========================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const canvas = document.querySelector('#bg');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ==========================
// OBJECT (UPGRADED)
// ==========================

// Main cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  metalness: 0.8,
  roughness: 0.2
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Particles (PREMIUM FEEL)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x00ffcc
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

scene.add(particlesMesh);

// ==========================
// LIGHTING
// ==========================
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);

const light2 = new THREE.PointLight(0x00ffcc, 1);
light2.position.set(-5, -5, -5);

scene.add(light1, light2);

// ==========================
// INTERACTION
// ==========================
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (event) => {
  targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetY = (event.clientY / window.innerHeight - 0.5) * 2;
});

let scrollY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// ==========================
// RESIZE FIX
// ==========================
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ==========================
// ANIMATION LOOP
// ==========================
function animate() {
  requestAnimationFrame(animate);

  // Smooth motion
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

  // Cube movement
  cube.rotation.y = currentX + scrollY * 0.002;
  cube.rotation.x = currentY + scrollY * 0.002;

  cube.position.y = Math.sin(scrollY * 0.01) * 0.5;

  // Particles movement
  particlesMesh.rotation.y += 0.0005;
  particlesMesh.rotation.x += 0.0005;

  // Camera
  camera.position.z = 5 + scrollY * 0.002;

  renderer.render(scene, camera);
}

animate();

// ==========================
// SCROLL REVEAL (CLEAN)
// ==========================
const sections = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

// ==========================
// HERO PARALLAX
// ==========================
const hero = document.querySelector(".hero");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  hero.style.transform = `translate(${x}px, ${y}px)`;
});