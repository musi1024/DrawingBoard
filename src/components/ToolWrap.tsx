import React from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';

const Wrap = styled.div`
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  position: absolute;
  left: ${vw(40)};
  top: ${vw(40)};
  width: ${vw(200)};
  padding: ${vw(15)};
  background-color: rgba(58, 74, 109, 0.9);
  border-radius: ${vw(18)};
`;

interface ToolProps {
  children?: React.ReactNode;
}

const ToolWrap: React.FC<ToolProps> = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default ToolWrap;
