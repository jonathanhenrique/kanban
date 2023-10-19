import { styled } from 'styled-components';

type Props = { $isCompleted: boolean };

const Subtask = styled.button<Props>`
  position: relative;
  padding: 1rem 1.2rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  line-height: 0;

  font-size: 1.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  width: 100%;
  background-color: var(--color-grey-500);
  color: var(--color-grey-100);

  &:not(:last-of-type) {
    margin-bottom: 0.6rem;
  }

  opacity: ${(props) => (props.$isCompleted ? '.5' : '1')};

  & svg {
    transition: all 200ms linear;
    height: 2rem;
    width: 2rem;
    fill: var(--color-2);
  }

  &::after {
    content: '';
    transition: transform 200ms var(--bezier-ease-out);
    display: block;
    height: 2px;
    width: 86%;
    position: absolute;
    top: calc(50% - 1px);
    left: 9%;
    background-color: var(--color-2);

    transform-origin: 0 0;
    transform: ${(props) => (props.$isCompleted ? 'scaleX(1)' : 'scaleX(0)')};
  }
`;

export default Subtask;
