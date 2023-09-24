import { styled } from 'styled-components';

const ModalContainer = styled.div`
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2.4rem;
  position: relative;

  background-color: var(--color-grey-700);

  animation: modalPosition 400ms var(--bezier-overshoot),
    modalScale 400ms var(--bezier-overshoot);

  animation-fill-mode: both;

  & > div {
    opacity: 1;
    animation: contentAnimation 100ms ease-out backwards;
    transition: opacity 50ms ease-out;
  }

  transition: transform 300ms var(--bezier-ease-out);

  &.toClose {
    transform: translateY(var(--origin-y, 0)) translateX(var(--origin-x, 0))
      scale(0);

    & > div {
      opacity: 0;
    }
  }
`;

export default ModalContainer;
