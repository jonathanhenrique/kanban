import { styled, css } from 'styled-components';
import FloatMenu from './FloatMenu';
import { HiMiniChevronDown } from 'react-icons/hi2';

type Props = { $isDraggingOver: boolean };

const StyledColumn = styled.div<Props>`
  flex: 0 0 34rem;
  padding: 1rem 0;

  & h3 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.4rem;
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

const ColumnOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Column({
  children,
  title,
  isDraggingOver,
}: {
  children: React.ReactNode;
  title: string;
  isDraggingOver: boolean;
}) {
  return (
    <StyledColumn $isDraggingOver={isDraggingOver}>
      <ColumnOptions>
        {title && <h3>{title}</h3>}
        <FloatMenu
          fineTunePosition={[-230, 42]}
          identifier={`column-${title}`}
          icon={<HiMiniChevronDown />}
        >
          <p>Teste 1</p>
          <p>Teste 2</p>
        </FloatMenu>
      </ColumnOptions>
      {children}
    </StyledColumn>
  );
}
