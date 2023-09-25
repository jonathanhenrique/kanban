import { styled } from 'styled-components';

const StyledTextArea = styled.textarea`
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;
  resize: none;

  &::placeholder {
    opacity: 0.7;
  }
`;

export default StyledTextArea;
