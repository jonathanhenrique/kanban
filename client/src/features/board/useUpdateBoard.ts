import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeOrder } from '../../services/apiCalls';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useUpdateBoard() {
  const { boardId } = useParams();
  const queryClient = useQueryClient();

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
      if (!boardId) throw new Error('You need to select a board!');

      return toast.promise(changeOrder(taskId, newPosition, newColumnId), {
        loading: 'Saving your changes...',
        success: 'Your board was updated!',
        error: 'Something went wrong. Try again latter.',
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [boardId, 'userBoard'],
      });
    },
  });

  return { isUpdatingPosition, mutate };
}
