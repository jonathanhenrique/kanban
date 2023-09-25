import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../services/apiCalls';

export function useCreateTask(boardId: string | undefined) {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreatingTask,
    mutate,
    error,
    reset,
    isError,
  } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [boardId],
      });
    },
  });

  return { isCreatingTask, mutate, error, reset, isError };
}
