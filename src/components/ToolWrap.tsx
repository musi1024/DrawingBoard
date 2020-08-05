import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import vw from 'utils/vw';
import Icon from 'components/Icon';

const Wrap = styled.div`
  position: absolute;
  left: ${vw(20)};
  top: ${vw(20)};
`;

interface MainProps {
  show: boolean;
}
const Main = styled.div<MainProps>`
  margin-top: ${vw(20)};
  width: ${vw(200)};
  display: ${p => (p.show ? 'flex' : 'none')};
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

const control = {
  visible: {
    x: 0
  },
  hidden: {
    x: '-120%'
  }
};

const ToolWrap: React.FC<ToolProps> = ({ children }) => {
  const [onOff, setOnOff] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const toggle = () => setOnOff(s => !s);

  return (
    <Wrap>
      <Icon type="huabi" onClick={toggle} />
      <motion.div
        initial="hidden"
        animate={onOff ? 'visible' : 'hidden'}
        variants={control}
        transition={{ type: 'spring', damping: 300 }}
        onAnimationStart={() => onOff && setShow(true)}
        onAnimationComplete={() => !onOff && setShow(false)}
      >
        <Main show={show}>{children}</Main>
      </motion.div>
    </Wrap>
  );
};

export default ToolWrap;
