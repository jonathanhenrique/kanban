import { styled } from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;

  &::placeholder {
    opacity: 0.7;
  }
`;

export default StyledInput;
