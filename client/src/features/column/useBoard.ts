import { useQuery } from '@tanstack/react-query';

export default function useBoard(boardId: string | undefined, index: number) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['boards', boardId],
    // queryFn: async () => {
    //   const res = await fetch(`/api/boards/${boardId}`);

    //   if (res.status !== 200)
    //     throw new Error('Something went wrong, try again latter.');

    //   const data = await res.json();
    //   return data;
    // },
    select(data) {
      return data.board.columns[index];
    },
    enabled: false,
  });

  return { data };
}
