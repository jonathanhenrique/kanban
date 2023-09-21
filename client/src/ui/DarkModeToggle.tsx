import { styled } from 'styled-components';

const DarkModeToggle = styled.div`
  align-self: center;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 2rem;

  & > svg {
    transition: fill 200ms 100ms linear;
    height: 1.7rem;
    width: 1.7rem;
  }
`;

export default DarkModeToggle;
