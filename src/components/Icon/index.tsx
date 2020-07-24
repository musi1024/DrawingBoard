import React from 'react';

interface IconProps {
  type: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ type, style }) => {
  return (
    <svg className="icon-font" aria-hidden="true" style={style}>
      <use xlinkHref={`#icon-${type}`}></use>
    </svg>
  );
};

export default Icon;
