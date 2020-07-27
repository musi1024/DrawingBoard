import React from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';

interface SvgProps {
  active?: boolean;
}

const Svg = styled.svg.attrs({ ariaHidden: 'true' })<SvgProps>`
  width: ${vw(80)};
  height: ${vw(80)};
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  background-color: ${({ active }) => (active ? `#ffffff` : null)};
  border-radius: ${vw(8)};
`;

interface IconProps {
  type: string;
  active?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, active, style, onClick }) => {
  return (
    <Svg style={style} active={active} onClick={onClick}>
      <use xlinkHref={`#icon-${type}`}></use>
    </Svg>
  );
};

Icon.defaultProps = {
  active: false
};

export default Icon;
