import React, { useState } from 'react';
import styled, { CSSProperties } from 'styled-components/macro';
import vw from 'utils/vw';
import vwToPx from 'rpf/un/vwToPx';

type Color = string;
interface ColorPickerProps {
  className?: string;
  style?: CSSProperties | undefined;
  colors?: [string];
  onChange?: (color: Color) => void;
}
interface MonitorProps {
  color: Color;
}
interface PickerProps {
  color: Color;
}

const Wrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: ${vw(170)};
  background-color: #ffffff;
  border-radius: ${vw(12)};
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px;
`;

const Monitor = styled.div<MonitorProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${vw(150)};
  background-color: ${p => p.color};
  border-top-left-radius: ${vw(12)};
  border-top-right-radius: ${vw(12)};
  color: #ffffff;
  font-size: ${vwToPx(vw(32))}px;
`;

const PickerWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: ${vw(20)} auto;
  padding: 0 ${vw(10)};
`;

const Picker = styled.div<PickerProps>`
  width: ${vw(40)};
  height: ${vw(40)};
  border-radius: ${vw(6)};
  background-color: ${p => p.color};
  margin: 0 0 ${vw(10)} 0;
`;

const Input = styled.input`
  width: 92%;
  margin-bottom: ${vw(20)};
  padding: ${vw(4)} ${vw(14)};
  font-size: ${vw(24)};
  color: rgb(102, 102, 102);
  border: none;
  border-radius: ${vw(6)};
  outline: none;
`;

const PickerArr = [
  '#d9e3f0',
  '#f47373',
  '#697689',
  '#37d67a',
  '#2ccce4',
  '#555555',
  '#dce775',
  '#ff8a65',
  '#ba68c8'
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  style,
  colors,
  onChange
}) => {
  const [color, setColor] = useState<Color>(colors?.[0] || PickerArr[0]);

  const pickColor = (color: Color) => {
    setColor(color);
    onChange && onChange(color);
  };

  return (
    <Wrap className={className} style={style}>
      <Monitor color={color}>{color}</Monitor>
      <PickerWrap>
        {PickerArr.map((color, index) => (
          <Picker key={index} color={color} onClick={() => pickColor(color)} />
        ))}
      </PickerWrap>
      <Input value={color} onChange={e => pickColor(e.target.value)} />
    </Wrap>
  );
};

export default ColorPicker;
