import { styled } from 'styled-components';

const ModalContainer = styled.div`
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3rem 4rem;

  background-color: var(--color-grey-500);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;
  animation: modalPopUp 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateY(0);

  transition: all 300ms cubic-bezier(0.63, -0.34, 0.84, 0.11);

  &.toClose {
    transform: translateY(10rem);
  }
`;

export default ModalContainer;
