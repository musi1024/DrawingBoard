export type Ctx = CanvasRenderingContext2D | null;
export interface Point {
  x: number;
  y: number;
}
export interface DrawLine extends Point {
  lastX: number;
  lastY: number;
}
