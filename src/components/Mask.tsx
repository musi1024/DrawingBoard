import styled from 'styled-components/macro';

interface MaskProps {
  opacity?: number;
  zIndex?: number;
}

const Mask = styled.div<MaskProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${p => `rgba(0, 0, 0, ${p.opacity})`};
  z-index: ${p => p.zIndex};
`;

Mask.defaultProps = {
  opacity: 0.6,
  zIndex: 99
};

export default Mask;
