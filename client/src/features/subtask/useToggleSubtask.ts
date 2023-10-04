import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCompleted } from '../../services/apiCalls';
import { subtaskType } from '../../types/types';

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
      queryClient.setQueryData(['tasks', subtask.taskId], ({ task }) => {
        const subtasks = [...task.subTasks];
        const updatedSubtasks = subtasks.map((st) =>
          st.id === subtask.id ? { ...st, completed: !st.completed } : st
        );
        console.log(data);
        return { task: { ...task, subTasks: updatedSubtasks } };
      });

      queryClient.invalidateQueries({ queryKey: ['tasks', subtask.taskId] });
    },
    onError: (err: Error) => console.log(`Error: ${err.message}`),
  });

  return { isUpdating, mutate, isError, error, reset };
}
