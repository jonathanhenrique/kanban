import { styled, css } from 'styled-components';

const StyledColumn = styled.div`
  width: 36rem;
  padding-top: 1rem;

  & h3 {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }

  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    background-color: var(--color-grey-500);
    border-radius: var(--border-radius-lg);

    transition: box-shadow 100ms ease-in;

    --color-shadow-1: #d73b54;
    --color-shadow-2: #cd3262;
    --shadow-pixels: 5px;

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
