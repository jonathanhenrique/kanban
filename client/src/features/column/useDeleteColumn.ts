import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteColumn } from '../../services/apiCalls';
import { boardType } from '../../types/types';
import { useCacheContext } from '../board/BoardCacheContext';
import { produce } from 'immer';

export function useDeleteColumn(boardId: string, columnId: string) {
  const { setCache } = useCacheContext();
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
      const prevState = queryClient.getQueryData<{ board: boardType }>([
        'boards',
        boardId,
      ]);

      if (!prevState) return;

      const newState = produce<{ board: boardType }>(
        prevState,
        (draftState: { board: boardType }) => {
          let { columns } = draftState.board;
          columns = columns.filter((column) => column.id !== columnId);
          draftState.board.columns = columns;
        }
      );

      queryClient.setQueryData(['boards', boardId], newState);
      setCache(newState.board.columns);
    },
  });

  return { isDeleting, mutate, isError, error, reset };
}
