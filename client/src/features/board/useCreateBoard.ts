import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoard } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isLoading: isCreatingBoard,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: createBoard,
    onSuccess: (data: { id: string }) => {
      queryClient.invalidateQueries({
        queryKey: ['userBoards'],
      });
      navigate(`/app/${data.id}`);
    },
  });

  return { isCreatingBoard, mutate, isError, error, reset };
}
