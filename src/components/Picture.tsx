import React from 'react';
import styled from 'styled-components/macro';
import vw from 'utils/vw';
import Modal from './Modal';
import CloseBtn from './CloseBtn';

interface WrapProps {
  imgUrl: string;
}
interface PictureProps extends WrapProps {
  open: boolean;
  onClose: () => void;
}

const Wrap = styled.div`
  position: relative;
  width: ${vw(620)};
  height: ${vw(980)};
  background-color: #ffffff;
  border-radius: ${vw(18)};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Tips = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${vw(20)};
  margin: 0 auto;
  text-align: center;
  font-size: ${vw(22)};
  color: #1d1646;
`;

const Picture: React.FC<PictureProps> = ({ open, imgUrl, onClose }) => {
  return (
    <Modal open={open}>
      <Wrap>
        <Img src={imgUrl} />
        <CloseBtn onClick={onClose} />
        <Tips>长按图片保存至相册</Tips>
      </Wrap>
    </Modal>
  );
};

export default Picture;
