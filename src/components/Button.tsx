import React from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';

interface WrapProps {
  width: number;
  height: number;
}
interface ButtonProps extends WrapProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Wrap = styled.div<WrapProps>`
  width: ${p => vw(p.width)};
  height: ${p => vw(p.height)};
`;

const Button: React.FC<ButtonProps> = ({
  children,
  width,
  height,
  onClick
}) => {
  return (
    <Wrap width={width} height={height} onClick={onClick}>
      {children}
    </Wrap>
  );
};

export default Button;
