import { Ctx, Point } from './utils';

function eraser(ctx: Ctx, { x, y, lineWidth }: Point): void {
  const size = lineWidth * 4;
  if (ctx) ctx.clearRect(x - size / 2, y - size / 2, size, size);
}

export default eraser;
