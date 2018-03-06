import { sameCoord } from './helpers';
import Map from './models/Map';

const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const MOUSE_LEFT = 0;
const MOUSE_RIGHT = 2;

canvas.addEventListener('mousedown', mouseDownHandler, false);
canvas.addEventListener('mouseup', mouseUpHandler, false);
canvas.addEventListener('mousemove', mouseMoveHandler, false);
window.addEventListener('keypress', keyPressHandler, false);

let paused = false;

const TEAM1 = 1;
const TEAM2 = 2;
const map = new Map({
  width: canvas.width,
  height: canvas.height
});

map.addTeam({
  id: TEAM1,
  colour: 'blue'
});

map.addTeam({
  id: TEAM2,
  colour: 'red'
});

const playersEach = 5;
for (let i = 0; i < playersEach; i++) {
  map.addRandomPlayerFor(TEAM1);
  map.addRandomPlayerFor(TEAM2);
}

let mouseLeftDown = false;
let dragStart: Coords | null = null;
let dragEnd: Coords | null = null;

function mouseDownHandler({ layerX: x, layerY: y, button }: MouseEvent) {
  if (button === MOUSE_LEFT) {
    map.clearSelected();
    dragStart = { x, y };
    mouseLeftDown = true;
  }
}

function mouseUpHandler({ layerX: x, layerY: y, button }: MouseEvent) {
  if (button === MOUSE_RIGHT) {
    map.moveSelectedTo({ x, y });
  } else if (button === MOUSE_LEFT) {
    mouseLeftDown = false;
    if (
      dragStart != null &&
      (dragEnd == null || sameCoord(dragStart, dragEnd))
    ) {
      map.selectPlayerAt(dragStart);
    } else if (dragStart != null && dragEnd != null) {
      map.selectPlayers(dragStart, dragEnd);
    }
    dragStart = null;
    dragEnd = null;
  }
}

function mouseMoveHandler({ layerX: x, layerY: y }: MouseEvent) {
  if (mouseLeftDown) {
    dragEnd = { x, y };
  }
}

function keyPressHandler(e: KeyboardEvent) {
  if (e.key === 'p') {
    paused = !paused;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < map.players.length; i++) {
    const player = map.players[i];
    const { coords: { x, y }, selected } = player;
    ctx.beginPath();
    ctx.arc(x, y, player.width / 2, 0, Math.PI * 2);
    const playerTeam = map.teamFor(player);
    ctx.fillStyle = playerTeam.colour;
    ctx.fill();

    if (selected) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'yellow';
      ctx.stroke();
    }

    ctx.closePath();
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

  if (paused) {
    ctx.fillStyle = '#000000';
    ctx.font = '30px Arial';
    ctx.fillText('Paused', canvas.width / 2 - 40, canvas.height / 2);
  } else {
    map.processFrame();
  }
}

setInterval(draw, 10);
