import { styled } from 'styled-components';

const ModalContainer = styled.div`
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3rem 4rem;
  position: relative;

  background-color: var(--color-grey-500);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;

  animation: modalPosition 400ms, modalScale 300ms 200ms, modalOpacity 50ms;
  animation-fill-mode: both;

  & > div {
    opacity: 1;
    animation: contentAnimation 200ms 200ms ease-out backwards;
    transition: opacity 150ms ease-out;
  }

  transition: transform 200ms cubic-bezier(0.5, 0, 0.38, 1);

  &.toClose {
    transform: translateY(var(--origin-y, 0)) translateX(var(--origin-x, 0))
      scale(0.1);

    & > div {
      opacity: 0;
    }
  }
`;

export default ModalContainer;
