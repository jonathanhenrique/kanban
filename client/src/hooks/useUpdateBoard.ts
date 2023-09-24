import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeOrder } from '../services/apiCalls';
import { useGlobalUI } from '../utils/GlobalUI';

export function useUpdateBoard(boardId: string | undefined) {
  const queryClient = useQueryClient();
  const { setBoardLocked } = useGlobalUI();

  const { isLoading: isUpdatingPosition, mutate } = useMutation({
    mutationFn: ({
      taskId,
      newPosition,
      newColumnId = null,
    }: {
      taskId: string;
      newPosition: number;
      newColumnId?: null | string;
    }) => {
      if (!boardId) throw new Error('No boardId');
      setBoardLocked(true);
      return changeOrder(taskId, newPosition, newColumnId);
    },
    onSuccess: () => {
      setBoardLocked(false);
      queryClient.invalidateQueries({
        queryKey: [boardId],
      });
    },
    onError: (err: Error) => {
      setBoardLocked(false);
      console.log(`Error ${err.message}`);
    },
  });

  return { isUpdatingPosition, mutate };
}
