import styled, { keyframes } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: calc(50% - 1.2rem);
  left: calc(50% - 1.2rem);

  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
