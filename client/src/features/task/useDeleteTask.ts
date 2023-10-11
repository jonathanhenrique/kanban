import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/apiCalls';
import { columnCacheType, taskType } from '../../types/types';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export default function useDeleteTask(taskId: string) {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isDeletingTask, mutate } = useMutation({
    mutationFn: (taskId: string) => {
      if (!taskId) throw new Error('You need to select a task!');

      return toast.promise(deleteTask(taskId), {
        loading: 'Deleting task...',
        success: 'Task Deleted!',
        error: 'Try again latter!',
      });
    },

    onSuccess: () => {
      const taskDeleted = queryClient.getQueryData<taskType>([boardId, taskId]);

      if (!taskDeleted) return;

      queryClient.setQueryData<columnCacheType>(
        [boardId, taskDeleted.columnId],
        (oldData) => {
          if (!oldData) return;
          const updatedTasks = Array.from(oldData.tasks);
          const idx = updatedTasks.findIndex((task) => task === taskDeleted.id);
          updatedTasks.splice(idx, 1);

          return { ...oldData, tasks: updatedTasks };
        }
      );
      queryClient.removeQueries([boardId, taskDeleted.id]);
    },
  });

  return { isDeletingTask, mutate };
}
