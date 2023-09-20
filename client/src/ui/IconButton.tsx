import { styled } from 'styled-components';

const IconButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  animation: scale 200ms var(--bezier-ease-out) 300ms;

  & svg {
    transition: transform 200ms var(--bezier-ease-out);
    width: 2.4rem;
    height: 2.4rem;

    transform: ${(props) => (props.open ? 'rotateZ(-180deg)' : 'rotateZ(0)')};
  }

  &:hover,
  &:focus {
    background-color: var(--color-grey-400);
  }
`;

export default IconButton;
