import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCompleted } from '../../services/apiCalls';
import { subtaskType, taskType } from '../../types/types';

export default function useToggleSubtask(subtask: subtaskType) {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: toggleCompleted,
    onSuccess: (data) => {
      queryClient.setQueryData<taskType>(
        ['task', subtask.taskId],
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
  });

  return { isUpdating, mutate, isError, error, reset };
}
