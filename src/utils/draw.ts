interface DrawCircle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}
interface DrawLine extends DrawCircle {
  lastX: number;
  lastY: number;
}

const lineWidth = 5;

export function drawCircle({ ctx, x, y }: DrawCircle): void {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 360);
  ctx.fill();
}

export function drawLine({ ctx, x, y, lastX, lastY }: DrawLine): void {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
}
