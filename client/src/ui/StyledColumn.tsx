import { styled, css } from 'styled-components';

type Props = { $isDraggingOver: boolean };

const StyledColumn = styled.div<Props>`
  flex: 0 0 34rem;
  padding: 1rem 0;

  & h3 {
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 0;
  }

  & ul {
    width: 100%;
    min-height: 9rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 0 1rem;
    background-color: var(--color-grey-700);
    border-radius: var(--border-radius-lg);

    transition: box-shadow 100ms ease-out;

    --color-shadow-1: var(--color-1);
    --color-shadow-2: var(--color-2);
    --shadow-pixels: 4px;

    ${(props) => {
      if (!props.$isDraggingOver) return '';
      return css`
        box-shadow: 0 1px var(--shadow-pixels) 0 var(--color-shadow-1),
          0 -1px var(--shadow-pixels) 0 var(--color-shadow-2),
          1px 0 var(--shadow-pixels) 0 var(--color-shadow-1),
          -1px 0 var(--shadow-pixels) 0 var(--color-shadow-2);
      `;
    }};
  }
`;

export default StyledColumn;
