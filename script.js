const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.position = 'absolute';
    cube.style.zIndex = 1000;

    cube.style.left = rect.left - containerRect.left + 'px';
    cube.style.top = rect.top - containerRect.top + 'px';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // keep cube inside container
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
