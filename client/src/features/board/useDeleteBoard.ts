import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard } from '../../services/apiCalls';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
      queryClient.setQueryData(['userBoards'], (oldData) => {
        if (!oldData) return;
        const newState = Array.from(oldData.boards);
        const idx = newState.findIndex((board) => board.id === data.id);
        newState.splice(idx, 1);

        return { boards: newState };
      });
      queryClient.removeQueries([data.id]);
      // queryClient.removeQueries(['columns', data.id]);
      // queryClient.removeQueries(['userBoard', data.id]);
      navigate('/app');
    },
  });

  return { mutate };
}
