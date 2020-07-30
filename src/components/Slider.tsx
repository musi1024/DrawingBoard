import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import clamp from 'ramda/src/clamp';
import vw from 'utils/vw';

interface SliderProps {
  value?: number;
  max?: number;
  min?: number;
  style?: React.CSSProperties | undefined;
  onChange?: (value: number) => void;
}
interface BarProps {
  actWidth: number;
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: ${vw(40)};
`;

const Bar = styled.div<BarProps>`
  width: 100%;
  height: ${vw(8)};
  background-color: gray;
  border-radius: ${vw(22)};
`;

const ActiveBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #eae3df;
  border-radius: ${vw(22)};
  pointer-events: none;
`;

const Handle = styled.div`
  position: absolute;
  left: 0;
  top: ${vw(-8)};
  width: ${vw(25)};
  height: ${vw(25)};
  background-color: #ffffff;
  border: 1px solid #8282b1;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const Slider: React.FC<SliderProps> = ({
  style,
  onChange,
  value = 0,
  max = 100,
  min = 0
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [handleX, setHandleX] = useState<number>(
    () => (value / (max - min + 1)) * 100
  );

  const lastX = useRef<number | null>();
  const onTouchStart = useCallback(e => {
    lastX.current = e.touches[0].clientX;
  }, []);
  const onTouchMove = useCallback(e => {
    const clientX = e.touches[0].clientX;
    if (lastX.current && barRef.current) {
      const x = ((clientX - lastX.current) / barRef.current.clientWidth) * 100;
      setHandleX(s => clamp(0, 100, s + x));
    }
    lastX.current = clientX;
  }, []);

  const handleClickBar = useCallback(e => {
    if (barRef.current) {
      console.log(e.nativeEvent.offsetX);

      setHandleX((e.nativeEvent.offsetX / barRef.current.clientWidth) * 100);
    }
  }, []);

  const onChangeCb = useRef<(value: number) => void | null>();
  useEffect(() => {
    onChangeCb.current = onChange;
  }, [onChange]);
  useEffect(() => {
    onChangeCb.current &&
      onChangeCb.current(
        clamp(min, max, Math.floor(handleX / (max - min + 1)))
      );
  }, [handleX, max, min]);

  return (
    <Wrap style={style}>
      <Bar ref={barRef} actWidth={handleX} onClick={handleClickBar} />
      <ActiveBar style={{ width: `${handleX}%` }} />
      <Handle
        style={{ left: `${handleX}%` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      />
    </Wrap>
  );
};

export default Slider;
