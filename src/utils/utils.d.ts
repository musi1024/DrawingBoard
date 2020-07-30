export type Ctx = CanvasRenderingContext2D | null;
export interface Point {
  x: number;
  y: number;
  lineWidth: number;
}
export interface DrawLine extends Point {
  lastX: number;
  lastY: number;
}
