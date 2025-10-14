const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    selectedItem = item;
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    item.style.position = 'absolute';
    item.style.zIndex = 1000;

    item.style.left = rect.left - containerRect.left + 'px';
    item.style.top = rect.top - containerRect.top + 'px';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedItem) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  x = Math.max(0, Math.min(x, container.clientWidth - selectedItem.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - selectedItem.offsetHeight));

  selectedItem.style.left = x + 'px';
  selectedItem.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (selectedItem) {
    selectedItem.style.zIndex = 1;
    selectedItem = null;
  }
});
