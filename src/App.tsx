import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import Icon from 'components/Icon';

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface Point {
  x: number;
  y: number;
}
interface DrawCircle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}
interface DrawLine extends DrawCircle {
  lastX: number;
  lastY: number;
}

const winW = window.innerWidth;
const winH = window.innerHeight;
const lineWidth = 5;

function drawCircle({ ctx, x, y }: DrawCircle): void {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 360);
  ctx.fill();
}

function drawLine({ ctx, x, y, lastX, lastY }: DrawLine): void {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const lastPoint = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
      canvasRef.current.width = winW;
      canvasRef.current.height = winH;
    }
  }, []);

  const onTouchStart = useCallback(e => {
    const { clientX: x, clientY: y } = e.touches[0];
    if (ctx.current) {
      drawCircle({ ctx: ctx.current, x, y });
      lastPoint.current = { x, y };
    }
  }, []);

  const onTouchMove = useCallback(e => {
    const { clientX: x, clientY: y } = e.touches[0];
    const { x: lastX, y: lastY } = lastPoint.current;
    if (ctx.current) {
      drawCircle({ ctx: ctx.current, x, y });
      drawLine({
        ctx: ctx.current,
        x,
        y,
        lastX,
        lastY
      });
      lastPoint.current = { x, y };
    }
  }, []);

  return (
    <Wrap className="App">
      <canvas
        ref={canvasRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      ></canvas>
    </Wrap>
  );
}

export default App;
