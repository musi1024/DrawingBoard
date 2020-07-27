import { Ctx, Point, DrawLine } from './utils';

const lineWidth = 5;

export function drawCircle(ctx: Ctx, { x, y }: Point): void {
  if (ctx) {
    ctx.beginPath();
    ctx.arc(x, y, lineWidth * 0.44, 0, 360);
    ctx.fill();
  }
}

export function drawLine(ctx: Ctx, { x, y, lastX, lastY }: DrawLine): void {
  if (ctx) {
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  }
}
