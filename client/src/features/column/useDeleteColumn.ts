import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteColumn } from '../../services/apiCalls';
import { IDType, columnsCacheType } from '../../types/types';
import toast from 'react-hot-toast';

export default function useDeleteColumn(boardId: IDType, columnId: IDType) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (columnId: string) => {
      if (!columnId) throw new Error('You need to select a column!');

      return toast.promise(deleteColumn(columnId), {
        loading: 'Deleting column...',
        success: 'Column Deleted!',
        error: 'Try again latter!',
      });
    },

    onSuccess: () => {
      queryClient.setQueryData<columnsCacheType>(
        [boardId, 'columns'],
        (oldData) => {
          if (!oldData) return;
          const newState = Array.from(oldData);
          const idx = newState.findIndex((column) => column.id === columnId);
          newState.splice(idx, 1);

          return newState;
        }
      );
      queryClient.removeQueries([boardId, columnId]);
    },
  });

  return { mutate };
}
