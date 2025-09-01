const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// container boundaries
const containerRect = container.getBoundingClientRect();

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    
    // calculate offset so cube sticks to cursor naturally
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // make cube absolute positioned inside container
    cube.style.position = 'absolute';
    cube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // boundary constraints
  x = Math.max(0, Math.min(x, container.clientWidth - selectedCube.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - selectedCube.offsetHeight));

  selectedCube.style.left = x + 'px';
  selectedCube.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = 1;
    selectedCube = null;
  }
});
