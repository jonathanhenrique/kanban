import { styled, css } from 'styled-components';

type Props = { $isDragging: boolean };

const StyledTask = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr 4rem;
  gap: 0.8rem;

  position: relative;

  padding: 1.2rem;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);

  transition: box-shadow 100ms ease-in;

  --color-shadow-1: var(--color-1);
  --color-shadow-2: var(--color-2);
  --shadow-pixels: 3px;

  ${(props) => {
    if (!props.$isDragging) return '';
    return css`
      box-shadow: 0 1px var(--shadow-pixels) 0 var(--color-shadow-1),
        0 -1px var(--shadow-pixels) 0 var(--color-shadow-2),
        1px 0 var(--shadow-pixels) 0 var(--color-shadow-1),
        -1px 0 var(--shadow-pixels) 0 var(--color-shadow-2);
    `;
  }};
`;

export default StyledTask;
