import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import clamp from 'ramda/src/clamp';
import vw from 'utils/vw';

interface SliderProps {
  style?: React.CSSProperties | undefined;
  onChange?: (value: number) => void;
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: ${vw(40)};
`;

const Bar = styled.div`
  width: 100%;
  height: ${vw(8)};
  background-color: gray;
  border-radius: ${vw(22)};
`;

const Handle = styled.div`
  position: absolute;
  left: 0;
  top: ${vw(-5)};
  width: ${vw(20)};
  height: ${vw(20)};
  background-color: #ffffff;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const Slider: React.FC<SliderProps> = ({ style, onChange }) => {
  const onChangeCb = useRef<(value: number) => void | null>();
  useEffect(() => {
    onChangeCb.current = onChange;
  }, [onChange]);

  const [value, setValue] = useState<number>(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const lastX = useRef<number | null>();

  const onTouchStart = useCallback(e => {
    const x = e.touches[0].clientX;
    lastX.current = x;
  }, []);

  const onTouchMove = useCallback(e => {
    const clientX = e.touches[0].clientX;
    if (lastX.current && barRef.current) {
      const x = ((clientX - lastX.current) / barRef.current.clientWidth) * 100;
      const res = clamp(0, 100, Math.round(x));
      setValue(res);
      onChangeCb.current && onChangeCb.current(res);
    }
  }, []);

  return (
    <Wrap style={style}>
      <Bar ref={barRef} />
      <Handle
        style={{ left: `${value}%` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      />
    </Wrap>
  );
};

export default Slider;
