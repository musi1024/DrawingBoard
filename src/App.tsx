import React, { useRef, useLayoutEffect, useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';
import { drawCircle, drawLine } from 'utils/draw';
import eraser from 'utils/eraser';
import { DRAW_BOARD } from 'configs/storageKey';
import ToolWrap from 'components/ToolWrap';
import ToolBlock from 'components/ToolBlock';
import Icon from 'components/Icon';
import Picture from 'components/Picture';
import Slider from 'components/Slider';
import ColorPicker from 'components/ColorPicker';

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
      const scale = window.devicePixelRatio || 4;
      canvasRef.current.width = winW * scale;
      canvasRef.current.height = winH * scale;
      ctx?.current?.scale(scale, scale);
    }
  }, []);

  // get img from localStorage to draw in canvas
  useLayoutEffect(() => {
    const dataURL = JSON.parse(String(localStorage.getItem(DRAW_BOARD)));
    const img = new Image();
    if (dataURL) {
      img.onload = () => ctx?.current?.drawImage(img, 0, 0, winW, winH);
      img.src = dataURL;
    }
  }, []);
  // set img in localStorage after touchEnd
  const onTouchEnd = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/png');
      localStorage.setItem(DRAW_BOARD, JSON.stringify(dataURL));
    }
  };

  // eraser on/off
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const toggleEraser = useCallback((value: boolean) => setIsEraser(value), []);

  // pen size
  const [lineWidth, setLineWidth] = useState<number>(5);
  // handle touchEvent start & move
  const lastPoint = useRef<Point>({ x: 0, y: 0 });
  const handleStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const { clientX: x, clientY: y } = e.touches[0];
      lastPoint.current = { x, y };
      if (isEraser) return eraser(ctx.current, { x, y, lineWidth });
      drawCircle(ctx.current, { x, y, lineWidth });
    },
    [isEraser, lineWidth]
  );
  const handleMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const { clientX: x, clientY: y } = e.touches[0];
      const { x: lastX, y: lastY } = lastPoint.current;
      lastPoint.current = { x, y };
      if (isEraser) return eraser(ctx.current, { x, y, lineWidth });
      drawCircle(ctx.current, { x, y, lineWidth });
      drawLine(ctx.current, {
        x,
        y,
        lastX,
        lastY,
        lineWidth
      });
    },
    [isEraser, lineWidth]
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

  const setPenSize = useCallback((value: number) => setLineWidth(value), []);

  const setColor = useCallback(color => {
    if (ctx.current) {
      ctx.current.fillStyle = color;
      ctx.current.strokeStyle = color;
    }
  }, []);

  return (
    <Wrap className="App">
      <canvas
        ref={canvasRef}
        style={{ width: winW, height: winH }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={onTouchEnd}
      ></canvas>
      <ToolWrap>
        <ToolBlock>
          <Icon type="save" onClick={save} />
          <Icon type="clear" onClick={clear} />
        </ToolBlock>
        <ToolBlock
          style={{
            padding: `${vw(15)} 0`,
            borderTop: `${vw(1)} solid rgb(236 231 231)`,
            borderBottom: `${vw(1)} solid rgb(236 231 231)`
          }}
        >
          <Icon
            type="pen"
            active={!isEraser}
            onClick={() => toggleEraser(false)}
          />
          <Icon
            type="eraser"
            active={isEraser}
            onClick={() => toggleEraser(true)}
          />
        </ToolBlock>
        <Slider
          style={{ width: '92%', margin: `${vw(40)} 0` }}
          value={5}
          min={1}
          max={10}
          onChange={setPenSize}
        />
        <ColorPicker style={{ marginBottom: vw(10) }} onChange={setColor} />
      </ToolWrap>
      <Picture
        open={showPicture}
        imgUrl={imgUrl}
        onClose={() => setShowPicture(false)}
      />
    </Wrap>
  );
}

export default App;
