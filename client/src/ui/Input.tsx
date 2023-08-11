import { useState } from 'react';
import { styled } from 'styled-components';

const StyledInput = styled.input`
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;
`;

export default function Input({
  placeholder,
  onBlur,
  type = 'text',
  id,
}: {
  placeholder: string;
  onBlur?: React.FocusEventHandler;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
}) {
  const [userInput, setUserInput] = useState('');

  return (
    <StyledInput
      type={type}
      id={id}
      placeholder={placeholder}
      onBlur={() => onBlur(userInput, id)}
      value={userInput}
      onChange={(event) => setUserInput(event.target.value)}
    />
  );
}
