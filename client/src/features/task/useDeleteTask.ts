import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/apiCalls';
import { useCacheContext } from '../board/BoardCacheContext';
import { cacheColumnType, taskType } from '../../types/types';

export default function useDeleteTask(taskId: string) {
  // const { setCache } = useCacheContext();
  const queryClient = useQueryClient();
  const {
    isLoading: isDeletingTask,
    mutate,
    error,
    reset,
    isError,
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      const taskDeleted = queryClient.getQueryData<taskType>(['task', taskId]);

      if (!taskDeleted) return;

      queryClient.setQueryData<cacheColumnType>(
        ['column', taskDeleted.columnId],
        (oldData) => {
          if (!oldData) return;
          const updatedTasks = Array.from(oldData.tasks);
          const idx = updatedTasks.findIndex((task) => task === taskDeleted.id);
          updatedTasks.splice(idx, 1);

          // setCache((s) => {
          //   const idx = s.findIndex((col) => col.id === taskDeleted.columnId);
          //   const newState = [...s];
          //   newState[idx] = { ...oldData, tasks: [...updatedTasks] };
          //   return newState;
          // });

          return { ...oldData, tasks: updatedTasks };
        }
      );
      queryClient.removeQueries(['task', taskDeleted.id]);
    },
  });

  return { isDeletingTask, mutate, error, reset, isError };
}

// const newState = produce<{ board: boardType }>(
//   prevState,
//   (draftState: { board: boardType }) => {
//     const { columns } = draftState.board;
//     const columnIdx = columns.findIndex((cl) => cl.id === columnId);
//     let tasks = columns[columnIdx].tasks;
//     tasks = tasks.filter((t) => t.id !== taskId);

//     draftState.board.columns[columnIdx].tasks = tasks;
//   }
// );
