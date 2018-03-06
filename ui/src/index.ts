const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

function draw() {
  ctx.fillStyle = '#000000';
  ctx.font = '30px Arial';
  ctx.fillText('Hello!', canvas.width / 2 - 20, canvas.height / 2);
}

setInterval(draw, 10);
