import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeOrder } from '../services/apiTask';
import { useGlobalUI } from '../utils/GlobalUI';

export function useUpdateBoard(boardId) {
  const queryClient = useQueryClient();
  const { setBoardLocked } = useGlobalUI();

  const { isLoading: isUpdatingPosition, mutate } = useMutation({
    mutationFn: ({ taskId, newPosition, newColumnId = null }) => {
      setBoardLocked(true);
      return changeOrder(taskId, newPosition, newColumnId);
    },
    onSuccess: () => {
      setBoardLocked(false);
      queryClient.invalidateQueries({
        queryKey: [boardId],
      });
    },
    onError: (err) => {
      setBoardLocked(false);
      console.log('Error');
    },
  });

  return { isUpdatingPosition, mutate };
}
