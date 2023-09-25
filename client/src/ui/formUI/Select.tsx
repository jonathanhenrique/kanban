import { styled } from 'styled-components';

const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20" stroke-width="2.5" stroke="%236362c6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>');
  background-repeat: no-repeat;
  background-position-y: 52%;
  background-position-x: 95%;

  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;

  cursor: pointer;

  & option {
    display: block;
    background-color: var(--color-grey-500);
    padding: 1rem;
  }
`;

export default StyledSelect;
