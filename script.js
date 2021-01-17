const canvas = document.querySelector('#canvas');
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');
const sizeEL = document.querySelector('#size');
const colorEl = document.querySelector('#color');
const clearEl = document.querySelector('#clear');
const eraseEl = document.querySelector('#erase');
const brushEl = document.querySelector('#brush');

const ctx = canvas.getContext('2d');

let size = 2;
let isPressed = false;
let isErasing = false;
let color = '#000';
let lastChanged = '#000';

let x;
let y;

eraseEl.addEventListener('click', () => {
  isErasing = true;
  color = '#fff';
});

brushEl.addEventListener('click', () => {
  isErasing = false;
  color = lastChanged;
});

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    if (isErasing) {
      const x2 = e.offsetX;
      const y2 = e.offsetY;

      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
    } else {
      const x2 = e.offsetX;
      const y2 = e.offsetY;

      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
    }
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

increaseBtn.addEventListener('click', () => {
  size += 2;

  if (size > 100) {
    size = 100;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  size -= 2;

  if (size < 2) {
    size = 2;
  }

  updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
  color = e.target.value;
  lastChanged = e.target.value;
});

clearEl.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
