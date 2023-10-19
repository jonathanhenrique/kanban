import { styled } from 'styled-components';

type Props = { $open?: boolean; $animateRotation?: boolean };

const IconButton = styled.button<Props>`
  width: 4rem;
  height: 4rem;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  transition: opacity 150ms var(--bezier-ease-out);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: transform 150ms var(--bezier-ease-out);
    transform: ${(props) =>
      props.$open && props.$animateRotation
        ? 'rotateZ(-180deg)'
        : 'rotateZ(0)'};
  }

  &:hover,
  &:focus {
    background-color: var(--color-grey-400);
  }

  opacity: ${(props) => (props.$open ? 0.5 : 1)};
`;

export default IconButton;
