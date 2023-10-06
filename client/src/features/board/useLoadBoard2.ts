import {
  useIsFetching,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { boardType, columnType } from '../../types/types';
import { getColumn, getTask } from '../../services/apiCalls';

export default function useLoadBoard2(
  boardId: string | undefined
  // onSuccessFn: (arg: columnType[]) => void
) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userBoard', boardId],
    queryFn: async () => {
      const res = await fetch(`/api/boards/${boardId}`);
      if (res.status !== 200) throw new Error('Error');
      const data = await res.json();

      // data.board.

      data.board.columns.forEach((column) => {
        let tasks = [];
        column.tasks.forEach((task) => {
          tasks.push(task.id);
          queryClient.setQueryData(['task', task.id], { ...task });
        });

        queryClient.setQueryData(['column', column.id], {
          name: column.name,
          id: column.id,
          boardId: column.boardId,
          tasks: tasks,
        });
      });

      const columns = data.board.columns.map((column) => ({
        id: column.id,
        name: column.name,
      }));

      queryClient.setQueryData(['columns', boardId], columns);

      return data;
    },
    select(data) {
      return data.board.columns.map((column) => {
        const tasks = column.tasks.map((task) => task.id);

        return {
          id: column.id,
          name: column.name,
          boardId: column.boardId,
          tasks,
        };
      });
    },
    onSuccess(data) {
      // onSuccessFn(data);
    },
  });

  // const board = data
  //   ? data.boards.find((b: boardType) => b.id === boardId)
  //   : null;

  // const queryClient = useQueryClient();

  // const isFetching = useIsFetching({ queryKey: ['userBoards'] });

  // if (isFetching) return;

  // const data = queryClient.getQueryData<{ boards: boardType[] }>([
  //   'userBoards',
  // ]);
  // const board = data?.boards.find((b: boardType) => b.id === boardId);

  // console.log(board);

  // const columnQueries = useQueries({
  //   queries: board
  //     ? board.columns.map((column: columnType) => {
  //         return {
  //           queryKey: ['column', column.id],
  //           queryFn: async () => column.id,
  //         };
  //       })
  //     : [],
  // });

  return { isLoading, isError, data, error };
}
