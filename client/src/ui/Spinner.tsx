import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* margin: 4.8rem auto; */

  width: 5.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #d73b54 94%, #0000) top/10px 10px
      no-repeat,
    conic-gradient(#0000 30%, #cd3262);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1000ms infinite cubic-bezier(0.5, 0, 0.5, 1);
`;

export default Spinner;
