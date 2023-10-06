import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../services/apiCalls';
import { cacheColumnType, taskType } from '../../types/types';
import { useCacheContext } from '../board/BoardCacheContext';

export function useCreateTask() {
  const { setCache } = useCacheContext();
  const queryClient = useQueryClient();
  const {
    isLoading: isCreatingTask,
    mutate,
    error,
    reset,
    isError,
  } = useMutation({
    mutationFn: createTask,
    onSuccess: ({ newTask }: { newTask: taskType }) => {
      queryClient.setQueryData<cacheColumnType>(
        ['column', newTask.columnId],
        (oldData) => {
          if (!oldData) return;

          const updatedTasks = [...oldData.tasks];
          updatedTasks.push(newTask.id);

          setCache((s) => {
            const idx = s.findIndex((col) => col.id === newTask.columnId);
            const newState = [...s];
            newState[idx] = { ...oldData, tasks: updatedTasks };
            return newState;
          });

          return { ...oldData, tasks: updatedTasks };
        }
      );
      queryClient.setQueryData(['task', newTask.id], newTask);
    },
  });

  return { isCreatingTask, mutate, error, reset, isError };
}
