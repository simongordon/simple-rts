const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

interface Coords {
  x: number;
  y: number;
}

const points: Coords[] = [
  {
    x: 20,
    y: 45
  }
];

function draw() {
  ctx.fillStyle = '#000000';
  ctx.font = '30px Arial';
  ctx.fillText('Hello!', canvas.width / 2 - 20, canvas.height / 2);

  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
}

setInterval(draw, 10);
