import React, { useState } from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';
import Icon from 'components/Icon';

const Wrap = styled.div`
  position: absolute;
  left: ${vw(20)};
  top: ${vw(20)};
`;

const Main = styled.div`
  width: ${vw(200)};
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: ${vw(15)};
  background-color: rgba(58, 74, 109, 0.9);
  border-radius: ${vw(18)};
`;

interface ToolProps {
  children?: React.ReactNode;
}

const ToolWrap: React.FC<ToolProps> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Wrap>
      <Icon type="huabi" onClick={() => setShow(s => !s)} />
      {show && <Main>{children}</Main>}
    </Wrap>
  );
};

export default ToolWrap;
