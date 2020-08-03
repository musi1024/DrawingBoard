import React, { useMemo } from 'react';
import styled from 'styled-components/macro';

interface AutoScaleProps {
  HPW?: number;
  children?: React.ReactNode;
}
interface WrapProps {
  scale: number;
}

const HPW = window.innerHeight / window.innerWidth;
function percent(tagHPW: number) {
  return HPW / tagHPW;
}

const Wrap = styled.div<WrapProps>`
  transform: scale(${({ scale }) => (scale > 1 ? 1 : scale)});
`;

const AutoScale: React.FC<AutoScaleProps> = ({
  children,
  HPW = 1200 / 750
}) => {
  const scale = useMemo(() => percent(HPW), [HPW]);
  return <Wrap scale={scale}>{children}</Wrap>;
};

export default AutoScale;
