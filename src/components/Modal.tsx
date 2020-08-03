import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  motion,
  useAnimation,
  AnimationControls,
  TargetAndTransition
} from 'framer-motion';
import styled from 'styled-components/macro';
import usePrevious from 'rpf/react/hooks/usePrevious';
import AutoScale from './AutoScale';
import Mask from './Mask';

interface ModalMaskProps {
  align?: string;
}
interface ModalWrapProps extends ModalMaskProps {
  children?: React.ReactNode;
  maskOpacity?: number;
  controls?:
    | string
    | boolean
    | string[]
    | AnimationControls
    | TargetAndTransition
    | undefined;
  HPW?: number;
}
interface ModalProps extends ModalWrapProps {
  open: boolean;
  portal?: boolean;
}

const MoMask = motion.custom(Mask);
const ModalMask = styled(MoMask)<ModalMaskProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${p => p.align};
`;

const mask = {
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};
const child = {
  visible: {
    opacity: 1,
    y: 0
  },
  hidden: {
    opacity: 0,
    y: '80%'
  }
};
const duration = 0.2;

const ModalWrap: React.FC<ModalWrapProps> = ({
  controls,
  children,
  maskOpacity,
  HPW,
  align = 'center'
}) => {
  return (
    <ModalMask
      initial="hidden"
      animate="visible"
      variants={mask}
      transition={{ duration }}
      opacity={maskOpacity}
      align={align}
    >
      <motion.div animate={controls} variants={child} transition={{ duration }}>
        <AutoScale HPW={HPW}>{children}</AutoScale>
      </motion.div>
    </ModalMask>
  );
};

const Modal: React.FC<ModalProps> = props => {
  const { open, portal = true } = props;
  const controls = useAnimation();
  const preOpen = usePrevious(open);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (open === preOpen) return;
    if (open) {
      setShow(true);
      controls.start('visible');
    } else controls.start('hidden').then(() => setShow(false));
  }, [controls, open, preOpen]);

  return show ? (
    portal ? (
      ReactDOM.createPortal(
        <ModalWrap {...props} controls={controls} />,
        document.body
      )
    ) : (
      <ModalWrap {...props} controls={controls} />
    )
  ) : null;
};

export default Modal;
