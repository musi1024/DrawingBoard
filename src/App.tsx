import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';
import { drawCircle, drawLine } from 'utils/draw';
import eraser from 'utils/eraser';
import Tool from 'components/ToolWrap';
import Icon from 'components/Icon';
import Picture from 'components/Picture';

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

  // save img
  const [imgUrl, setImgUrl] = useState<string>('');
  const [showPicture, setShowPicture] = useState<boolean>(false);
  const save = useCallback(async () => {
    if (canvasRef.current) {
      const url = await canvasRef.current.toDataURL('image/png');
      setImgUrl(url);
      setShowPicture(true);
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
        <Icon type="save" onClick={save} />
        <Icon type="clear" onClick={clear} />
        <Icon
          type="pen"
          active={!isEraser}
          style={{ marginTop: vw(15) }}
          onClick={() => toggleEraser(false)}
        />
        <Icon
          type="eraser"
          active={isEraser}
          style={{ marginTop: vw(15) }}
          onClick={() => toggleEraser(true)}
        />
      </Tool>
      <Picture
        open={showPicture}
        imgUrl={imgUrl}
        onClose={() => setShowPicture(false)}
      />
    </Wrap>
  );
}

export default App;
