import { useQuery } from '@tanstack/react-query';
import { columnType } from '../../types/types';

export default function useLoadBoard(
  boardId: string | undefined,
  onSuccessFn: (arg: columnType[]) => void
) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['boards', boardId],
    queryFn: async () => {
      const res = await fetch(`/api/boards/${boardId}`);

      if (res.status !== 200)
        throw new Error('Something went wrong, try again latter.');

      const data = await res.json();
      // onSuccessFn(data.board.columns);
      return data;
    },
    select(data) {
      return data.board.columns.map((column) => {
        const tasks = column.tasks.map((task) => ({
          id: task.id,
          order: task.order,
        }));

        return {
          id: column.id,
          name: column.name,
          tasks,
        };
      });
    },
    onSuccess(data) {
      console.log(data);
      onSuccessFn(data);
    },
  });

  return { isLoading, isError, data, error };
}
