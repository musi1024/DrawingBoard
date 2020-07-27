import { Ctx, Point } from './utils';

const size = 20;

function eraser(ctx: Ctx, { x, y }: Point): void {
  if (ctx) ctx.clearRect(x - size / 2, y - size / 2, size, size);
}

export default eraser;
