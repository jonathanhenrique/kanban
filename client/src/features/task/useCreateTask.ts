import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../services/apiCalls';
import { columnCacheType, taskType } from '../../types/types';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useCreateTask() {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isCreatingTask, mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: ({ newTask }: { newTask: taskType }) => {
      queryClient.setQueryData<columnCacheType>(
        [boardId, newTask.columnId],
        (oldData) => {
          if (!oldData) return;

          const updatedTasks = [...oldData.tasks];
          updatedTasks.push(newTask.id);

          return { ...oldData, tasks: updatedTasks };
        }
      );
      queryClient.setQueryData([boardId, newTask.id], newTask);
      toast.success('Task created!');
    },
    onError() {
      toast.error('Something went wrong. Try again latter.');
    },
  });

  return { isCreatingTask, mutate };
}
