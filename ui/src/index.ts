import Map from './models/Map';

const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const MOUSE_LEFT = 0;
const MOUSE_RIGHT = 2;

canvas.addEventListener('mousedown', mouseDownHandler, false);
canvas.addEventListener('mouseup', mouseUpHandler, false);
canvas.addEventListener('mousemove', mouseMoveHandler, false);

const map = new Map();
map.addPlayerAt({
  x: 20,
  y: 45
});
map.addPlayerAt({
  x: 145,
  y: 245
});
map.addPlayerAt({
  x: 350,
  y: 107
});

let dragStart: Coords | null = null;
let dragEnd: Coords | null = null;

function mouseDownHandler({ layerX: x, layerY: y, button }: MouseEvent) {
  if (button == MOUSE_LEFT) {
    dragStart = { x, y };
  }
}

function mouseUpHandler({ layerX: x, layerY: y, button }: MouseEvent) {
  if (button == MOUSE_RIGHT) {
    map.addPlayerAt({ x, y });
  } else if (button == MOUSE_LEFT) {
    dragStart = null;
    dragEnd = null;
  }
}

function mouseMoveHandler({ layerX: x, layerY: y, button }: MouseEvent) {
  if (button == MOUSE_LEFT) {
    dragEnd = { x, y };
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000000';
  ctx.font = '30px Arial';
  ctx.fillText('Hello!', canvas.width / 2 - 20, canvas.height / 2);

  for (let i = 0; i < map.players.length; i++) {
    const { x, y } = map.players[i].coords;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  if (dragStart != null && dragEnd != null) {
    const { x: startX, y: startY } = dragStart;
    const { x: endX, y: endY } = dragEnd;
    ctx.beginPath();
    ctx.rect(startX, startY, endX - startX, endY - startY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
  }
}

setInterval(draw, 10);
