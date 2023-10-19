import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCompleted } from '../../services/apiCalls';
import { subtaskType, taskType } from '../../types/types';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useToggleSubtask(subtask: subtaskType) {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: toggleCompleted,
    onSuccess: (data) => {
      queryClient.setQueryData<taskType>(
        [boardId, subtask.taskId],
        (oldData) => {
          if (!oldData) return;

          const subtasks = [...oldData.subTasks];
          const updatedSubtasks = subtasks.map((st) => {
            if (st.id === subtask.id) return data.subTask;
            return st;
          });

          return { ...oldData, subTasks: updatedSubtasks };
        }
      );
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { isUpdating, mutate };
}
