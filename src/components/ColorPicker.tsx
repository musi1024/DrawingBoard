import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from 'react';
import styled, { CSSProperties } from 'styled-components/macro';
import vwToPx from 'rpf/un/vwToPx';
import vw from 'utils/vw';
import isHex from 'utils/isHex';
import isDark from 'utils/isDark';
import storageKey from 'configs/storageKey';

type Color = string;
interface ColorPickerProps {
  className?: string;
  style?: CSSProperties | undefined;
  colors?: [string];
  onChange?: (color: Color) => void;
}
interface MonitorProps {
  color: Color;
  fontColor: Color;
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
  color: ${p => p.fontColor};
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

const baseColors = [
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
  const [pickerArr, setPickerArr] = useState<[Color]>(
    () =>
      JSON.parse(String(localStorage.getItem(storageKey.COLOR_PICKER))) ||
      colors ||
      baseColors
  );

  // using color
  const [color, setColor] = useState<Color>(pickerArr[0]);
  // input color text
  const [inputColor, setInputColor] = useState<Color>(pickerArr[0]);
  // monitor font color
  const fontColor = useMemo(() => (isDark(color) ? '#ffffff' : '#000000'), [
    color
  ]);

  // call onChange when change using color
  const onChangeRef = useRef<(color: Color) => void>();
  useEffect(() => {
    if (onChange) {
      onChangeRef.current = onChange;
    }
  }, [onChange]);
  useEffect(() => {
    if (onChangeRef.current) {
      onChangeRef.current(color);
    }
  }, [color]);

  // handle pick color
  const pickColor = (color: Color) => {
    setColor(color);
    setInputColor(color);
  };

  // handle input color
  const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setInputColor(color);
    if (!isHex(color)) return;
    setColor(color);
    setPickerArr(s => {
      if (s.includes(color)) return s;
      const ss = s;
      ss.splice(-1);
      ss.unshift(color);
      localStorage.setItem(storageKey.COLOR_PICKER, JSON.stringify(ss));
      return ss;
    });
  }, []);

  return (
    <Wrap className={className} style={style}>
      <Monitor fontColor={fontColor} color={color}>
        {color}
      </Monitor>
      <PickerWrap>
        {pickerArr.map((color: Color, index: number) => (
          <Picker key={index} color={color} onClick={() => pickColor(color)} />
        ))}
      </PickerWrap>
      <Input maxLength={7} value={inputColor} onChange={onInput} />
    </Wrap>
  );
};

export default ColorPicker;
