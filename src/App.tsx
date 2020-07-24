import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { drawCircle, drawLine } from 'utils/draw';
// import Icon from 'components/Icon';

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

const winW = window.innerWidth;
const winH = window.innerHeight;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const lastPoint = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const handleStart = useCallback(e => {
    const { clientX: x, clientY: y } = e.touches[0];
    if (ctx.current) {
      drawCircle({ ctx: ctx.current, x, y });
      lastPoint.current = { x, y };
    }
  }, []);

  const handleMove = useCallback(e => {
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
        width={winW}
        height={winH}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
      ></canvas>
    </Wrap>
  );
}

export default App;
