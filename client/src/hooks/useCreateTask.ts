import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../services/apiCalls';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingTask, mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currBoard'],
      });
    },
    onError: (err) => console.log('Error'),
  });

  return { isCreatingTask, mutate };
}
