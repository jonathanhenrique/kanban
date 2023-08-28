import { styled, css } from 'styled-components';

const StyledColumn = styled.div`
  width: 36rem;
  /* background-color: var(--color-grey-500); */
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
    /* background-color: ${(props) =>
      props.isDraggingOver
        ? 'var(--backdrop-color)'
        : 'var(--color-grey-500)'}; */
    background-color: var(--color-grey-500);
    border-radius: var(--border-radius-lg);

    transition: box-shadow 150ms;

    --color-shadow: hsl(241, 47%, 65%);

    ${(props) => {
      if (!props.isDraggingOver) return '';
      return css`
        box-shadow: 0 1px 5px 0 var(--color-shadow),
          0 -1px 5px 0 var(--color-shadow), 1px 0 5px 0 var(--color-shadow),
          -1px 0 5px 0 var(--color-shadow);
      `;
    }};
  }
`;

export default function Column({ children, title, isDraggingOver }) {
  return (
    <StyledColumn isDraggingOver={isDraggingOver}>
      {title && <h3>{title}</h3>}
      {children}
    </StyledColumn>
  );
}
