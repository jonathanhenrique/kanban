import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumn } from '../../services/apiCalls';
import { columnsCacheType, columnType, IDType } from '../../types/types';
import toast from 'react-hot-toast';

export default function useCreateColumn(boardId: IDType) {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreating,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: (newColumn: { name: string; boardId: string }) => {
      if (!boardId) throw new Error('You need to select a board!');

      return toast.promise(createColumn(newColumn), {
        loading: 'Creating column...',
        success: 'Column created!',
        error: 'Something went wrong. Try again latter.',
      });
    },
    onSuccess: (data: columnType) => {
      queryClient.setQueryData<columnsCacheType>(
        [boardId, 'columns'],
        (oldData) => {
          const newState = oldData ? Array.from(oldData) : [];
          newState.push({ id: data.id, name: data.name });
          return newState;
        }
      );
      queryClient.setQueryData([data.boardId, data.id], { ...data, tasks: [] });
    },
  });

  return { isCreating, mutate, isError, error, reset };
}
