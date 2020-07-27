import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { drawCircle, drawLine } from 'utils/draw';
import eraser from 'utils/eraser';
import Tool from 'components/ToolWrap';
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

const winW = window.innerWidth;
const winH = window.innerHeight;

function App() {
  // get canvas context
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  useLayoutEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  // eraser on/off
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const toggleEraser = useCallback((value: boolean) => setIsEraser(value), []);

  // handle touchEvent start & move
  const lastPoint = useRef<Point>({ x: 0, y: 0 });
  const handleStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const { clientX: x, clientY: y } = e.touches[0];
      if (isEraser) return eraser(ctx.current, { x, y });
      drawCircle(ctx.current, { x, y });
      lastPoint.current = { x, y };
    },
    [isEraser]
  );
  const handleMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const { clientX: x, clientY: y } = e.touches[0];
      const { x: lastX, y: lastY } = lastPoint.current;
      if (isEraser) return eraser(ctx.current, { x, y });
      drawCircle(ctx.current, { x, y });
      drawLine(ctx.current, {
        x,
        y,
        lastX,
        lastY
      });
      lastPoint.current = { x, y };
    },
    [isEraser]
  );

  const save = useCallback(() => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'picture';
      a.click();
    }
  }, []);

  // clear all
  const clear = useCallback(
    () => ctx?.current?.clearRect(0, 0, winW, winH),
    []
  );

  return (
    <Wrap className="App">
      <canvas
        ref={canvasRef}
        width={winW}
        height={winH}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
      ></canvas>
      <Tool>
        <Icon type="dakaiwenjianjia" onClick={save} />
        <Icon type="lajixiang_huaban1" onClick={clear} />
        <Icon
          type="huabi_huaban1"
          active={!isEraser}
          onClick={() => toggleEraser(false)}
        />
        <Icon
          type="xiangpi_huaban1"
          active={isEraser}
          onClick={() => toggleEraser(true)}
        />
      </Tool>
    </Wrap>
  );
}

export default App;
