import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  position: fixed;
  top: calc(50% - 2.3rem);
  left: calc(50% - 2.3rem);
  z-index: 100000;

  width: 4.6rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #d73b54 94%, #0000) top/10px 10px
      no-repeat,
    conic-gradient(#0000 30%, #cd3262);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1000ms infinite linear;
`;

export default Spinner;
