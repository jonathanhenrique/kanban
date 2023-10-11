import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { loadBoard } from '../../services/apiCalls';
import { columnType, taskType } from '../../types/types';

export default function useLoadBoard() {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['userBoard', boardId],
    queryFn: async () => {
      if (!boardId) throw new Error('You need to select a board!');
      const data = await loadBoard(boardId);

      data.board.columns.forEach((column: columnType) => {
        const tasks: string[] = [];

        column.tasks.forEach((task) => {
          tasks.push(task.id);
          queryClient.setQueryData([boardId, task.id], { ...task });
        });

        queryClient.setQueryData([boardId, column.id], {
          name: column.name,
          id: column.id,
          boardId: column.boardId,
          tasks: tasks,
        });
      });

      const columns = data.board.columns.map((column: columnType) => ({
        id: column.id,
        name: column.name,
      }));

      queryClient.setQueryData([boardId, 'columns'], columns);

      return data;
    },
    select(data) {
      return data.board.columns.map((column: columnType) => {
        const tasks = column.tasks.map((task: taskType) => task.id);
        return {
          id: column.id,
          name: column.name,
          boardId: column.boardId,
          tasks,
        };
      });
    },
  });

  return { data, isLoading, isError, error, refetch };
}
