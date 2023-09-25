import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumn } from '../../services/apiCalls';

export function useCreateColumn(boardId) {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreatingColumn,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [boardId],
      });
    },
  });

  return { isCreatingColumn, mutate, isError, error, reset };
}
