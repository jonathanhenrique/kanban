import { styled, css } from 'styled-components';

const StyledColumn = styled.div`
  width: 36rem;
  padding: 1rem 0;

  & h3 {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }

  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
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

export default function Column({ children, title, isDraggingOver }) {
  return (
    <StyledColumn $isDraggingOver={isDraggingOver}>
      {title && <h3>{title}</h3>}
      {children}
    </StyledColumn>
  );
}
