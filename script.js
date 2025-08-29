// Your code here.
const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cubes in grid positions
cubes.forEach((cube, index) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  cube.style.left = col * 100 + "px";
  cube.style.top = row * 100 + "px";

  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;

    // Calculate offset between mouse and cube
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;

    cube.style.cursor = "grabbing";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!selectedCube) return;

  // New position
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Boundaries
  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + cubeRect.width > containerRect.width) {
    x = containerRect.width - cubeRect.width;
  }
  if (y + cubeRect.height > containerRect.height) {
    y = containerRect.height - cubeRect.height;
  }

  // Apply position
  selectedCube.style.left = x + "px";
  selectedCube.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.cursor = "grab";
    selectedCube = null;
  }
});
