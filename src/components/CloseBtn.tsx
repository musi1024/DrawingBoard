import React from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';
import Icon from './Icon';

interface CloseBtnProps {
  onClick: () => void;
  style?: React.CSSProperties | undefined;
}

const Wrap = styled.div`
  position: absolute;
  right: ${vw(-10)};
  top: ${vw(-80)};
  width: ${vw(60)};
  height: ${vw(60)};
`;

const CloseBtn: React.FC<CloseBtnProps> = ({ style, onClick }) => {
  return (
    <Wrap style={style} onClick={onClick}>
      <Icon type="close" style={{ width: '100%', height: '100%', margin: 0 }} />
    </Wrap>
  );
};

export default CloseBtn;
