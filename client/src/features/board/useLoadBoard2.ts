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
  const { data } = useQuery({
    queryKey: ['userBoards'],
    queryFn: async () => {
      const res = await fetch('/api/boards/');
      if (res.status !== 200) throw new Error('Error');
      const data = await res.json();
      return data;
    },
    enabled: false,
  });

  const board = data
    ? data.boards.find((b: boardType) => b.id === boardId)
    : null;

  // const queryClient = useQueryClient();

  // const isFetching = useIsFetching({ queryKey: ['userBoards'] });

  // if (isFetching) return;

  // const data = queryClient.getQueryData<{ boards: boardType[] }>([
  //   'userBoards',
  // ]);
  // const board = data?.boards.find((b: boardType) => b.id === boardId);

  // console.log(board);

  const columnQueries = useQueries({
    queries: board
      ? board.columns.map((column: columnType) => {
          // const queries = column.tasks.map((task) => {
          //   return {
          //     queryKey: ['task', task.id],
          //     queryFn: async () => getTask(task.id),
          //   };
          // });
          // return queries;
          return {
            queryKey: ['column', column.id],
            queryFn: async () => getColumn(column.id),
          };
        })
      : [],
  });

  console.log(columnQueries);

  return { teste: false };
}
