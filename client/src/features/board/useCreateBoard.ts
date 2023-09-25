import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoard } from '../../services/apiCalls';

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreatingBoard,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userBoards'],
      });
    },
  });

  return { isCreatingBoard, mutate, isError, error, reset };
}
