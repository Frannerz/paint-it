// setup variables
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

// toolkit variables
const toolKit = document.getElementById('tools');
const colourChoice = document.getElementById('colorpicker');
const widthSelector = document.getElementById('widthSelector');
const capStyle = document.getElementById('capStyle');
const specialEffects = document.getElementById('special-effects');
const colorPallette = document.getElementById('colour-pallette');
const eraser = document.getElementById('eraser');
const brush = document.getElementById('brush');
// const joinStyle = document.getElementById('joinStyle');

// setup settings
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
toolKit.width = window.innerWidth;
// toolKit.height = window.innerHeight * 0.1;

// drawing settings
ctx.strokeStyle = colourChoice.value;
ctx.lineJoin = 'round';
ctx.lineCap = capStyle.value;
ctx.lineWidth = widthSelector.value;
ctx.globalCompositeOperation = specialEffects.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw (event) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  [lastX, lastY] = [event.offsetX, event.offsetY];
}

function erase () {
  ctx.strokeStyle = 'white';
}

eraser.addEventListener('click', erase);

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

// toolkit functions

// colour controls
function showColorPicker () {
  colourChoice.classList.toggle('show');
}

colorPallette.addEventListener('click', showColorPicker);

function changeColour () {
  ctx.strokeStyle = colourChoice.value;
  colourChoice.classList.toggle('show');
}

colourChoice.addEventListener('input', changeColour);

// width controls
function changeWidth () {
  ctx.lineWidth = widthSelector.value;
}

widthSelector.addEventListener('input', changeWidth);

// shape controls
function showLineCap () {
  capStyle.classList.toggle('show');
}

brush.addEventListener('click', showLineCap);

function changeLineCap () {
  ctx.lineCap = capStyle.value;
  capStyle.classList.toggle('show');
}

capStyle.addEventListener('input', changeLineCap)

// effects controls
const preview = document.getElementById('effect-preview');

function showEffectsControl () {
  specialEffects.classList.toggle('show');
}

preview.addEventListener('click', showEffectsControl);

function changeCompositeOperation () {
  const selectedOperation = specialEffects.value;
  preview.style.backgroundImage = `url('images/${selectedOperation}.png')`;
  ctx.globalCompositeOperation = specialEffects.value;
  specialEffects.classList.toggle('show');
}

specialEffects.addEventListener('input', changeCompositeOperation)


// ideas
// add background color option
// add option to save image?