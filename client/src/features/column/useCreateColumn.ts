import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumn } from '../../services/apiCalls';

export function useCreateColumn(boardId: string) {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreatingColumn,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createColumn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['columns', boardId], (oldData) => {
        const newState = Array.from(oldData);
        newState.push({ id: data.id, name: data.name });
        return newState;
      });
      queryClient.setQueryData(['column', data.id], { ...data, tasks: [] });
      // queryClient.invalidateQueries({
      //   queryKey: ['userBoard', boardId],
      // });
    },
  });

  return { isCreatingColumn, mutate, isError, error, reset };
}
