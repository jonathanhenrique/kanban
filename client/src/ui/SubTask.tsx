import { useState } from 'react';
import { styled } from 'styled-components';

const StyledInput = styled.input`
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;
`;

export default function SubTask({
  currValue,
  index,
  handleBlur,
  handleDelete,
}) {
  const [input, setInput] = useState('');

  return (
    <div>
      <StyledInput
        defaultValue={currValue}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onBlur={() => handleBlur({ index, input })}
        placeholder="e.g. Make coffee"
      />
      <button onClick={handleDelete}>deletar</button>
    </div>
  );
}
