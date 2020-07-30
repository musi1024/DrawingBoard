import { Ctx, Point, DrawLine } from './utils';

export function drawCircle(ctx: Ctx, { x, y, lineWidth }: Point): void {
  if (ctx) {
    ctx.beginPath();
    ctx.arc(x, y, lineWidth * 0.44, 0, 360);
    ctx.fill();
  }
}

export function drawLine(
  ctx: Ctx,
  { x, y, lastX, lastY, lineWidth }: DrawLine
): void {
  if (ctx) {
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}
