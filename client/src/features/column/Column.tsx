import { styled, css } from 'styled-components';
import FloatMenu from '../../ui/FloatMenu';
import {
  HiMiniChevronDown,
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
} from 'react-icons/hi2';
import Button from '../../ui/formUI/Button';
import IconButton from '../../ui/formUI/IconButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteColumn } from '../../services/apiCalls';

type Props = { $isDraggingOver: boolean };

const StyledColumn = styled.div<Props>`
  flex: 0 0 34rem;
  padding: 1rem 0;

  & h3 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.4rem;
    line-height: 0;
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
  columnId,
  boardId,
}: {
  children: React.ReactNode;
  title: string;
  isDraggingOver: boolean;
  columnId: string;
  boardId: string;
}) {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [boardId],
      });
    },
  });

  return (
    <StyledColumn $isDraggingOver={isDraggingOver}>
      <ColumnOptions>
        {title && <h3>{title}</h3>}
        <FloatMenu
          fineTunePosition={[-60, 45]}
          identifier={`column-${title}`}
          icon={<HiMiniEllipsisVertical />}
        >
          <Button variation="mini" onClick={() => mutate(columnId)}>
            <HiMiniTrash />
            <span>Delete</span>
          </Button>
          <Button variation="mini">
            <HiMiniWrenchScrewdriver />
            <span>Edit</span>
          </Button>
        </FloatMenu>
      </ColumnOptions>
      {children}
    </StyledColumn>
  );
}
