import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

// ================= SCENE =================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

const canvas = document.querySelector('#bg');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

// ================= MAIN OBJECT =================
const geometry = new THREE.IcosahedronGeometry(1.3, 1);

const material = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  metalness: 0.9,
  roughness: 0.2
});

const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// ================= PARTICLES =================
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x00ffcc
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// ================= LIGHT =================
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);

const light2 = new THREE.PointLight(0x00ffcc, 1.2);
light2.position.set(-5, -5, -5);

scene.add(light1, light2);

// ================= INTERACTION =================
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

let scrollY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// ================= RESIZE =================
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ================= ANIMATION =================
function animate() {
  requestAnimationFrame(animate);

  // base rotation
  shape.rotation.y += 0.005;
  shape.rotation.x += 0.003;

  // mouse effect
  shape.rotation.y += mouseX * 0.02;
  shape.rotation.x += mouseY * 0.02;

  // floating motion
  shape.position.y = Math.sin(scrollY * 0.01) * 0.6;

  // particles movement
  particles.rotation.y += 0.0007;
  particles.rotation.x += 0.0007;

  renderer.render(scene, camera);
}

animate();

// ================= MENU =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.onclick = () => {
  nav.classList.toggle("active");
};