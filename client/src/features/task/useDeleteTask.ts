import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/apiCalls';
import { useCacheContext } from '../board/BoardCacheContext';
import { boardType } from '../../types/types';
import { produce } from 'immer';

export default function (boardId: string, columnId: string, taskId: string) {
  const { setCache } = useCacheContext();
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      const prevState = queryClient.getQueryData<{ board: boardType }>([
        'boards',
        boardId,
      ]);

      if (!prevState) return;

      const newState = produce<{ board: boardType }>(
        prevState,
        (draftState: { board: boardType }) => {
          const { columns } = draftState.board;
          const columnIdx = columns.findIndex((cl) => cl.id === columnId);
          let tasks = columns[columnIdx].tasks;
          tasks = tasks.filter((t) => t.id !== taskId);

          draftState.board.columns[columnIdx].tasks = tasks;
        }
      );

      queryClient.setQueryData(['boards', boardId], newState);
      setCache(newState.board.columns);
    },
  });

  return { isDeleting, mutate, isError, error, reset };
}
