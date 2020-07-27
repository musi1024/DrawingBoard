import React from 'react';
import styled from 'styled-components/macro';

interface ToolBlockProps {
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ToolBlock: React.FC<ToolBlockProps> = ({ children, style }) => {
  return <Wrap style={style}>{children}</Wrap>;
};

export default ToolBlock;
