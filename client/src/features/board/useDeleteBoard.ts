import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard } from '../../services/apiCalls';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { boardCacheType } from '../../types/types';

export default function useDeleteBoard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (boardId: string) => {
      if (!boardId) throw new Error('You need to select a board!');

      return toast.promise(deleteBoard(boardId), {
        loading: 'Deleting board...',
        success: 'Board Deleted!',
        error: 'Try again latter.',
      });
    },

    onSuccess: (data: { id: string }) => {
      queryClient.setQueryData<boardCacheType[]>(['userBoards'], (oldData) => {
        if (!oldData) return;
        const newState = Array.from(oldData);
        const idx = newState.findIndex((board) => board.id === data.id);
        newState.splice(idx, 1);

        return newState;
      });
      queryClient.removeQueries([data.id]);
      navigate('/app');
    },
  });

  return { mutate };
}
