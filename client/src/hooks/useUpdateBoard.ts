import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeOrder } from '../services/apiTask';

export function useUpdateBoard() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdatingPosition, mutate } = useMutation({
    mutationFn: ({ taskId, newPosition }) => changeOrder(taskId, newPosition),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currBoard'],
      });
    },
    onError: (err) => console.log('Error'),
  });

  return { isUpdatingPosition, mutate };
}
