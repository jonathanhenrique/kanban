import { useQuery } from '@tanstack/react-query';

export default function useLoadBoard(boardId, onSuccessFn) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [boardId],
    queryFn: async () => {
      const res = await fetch(`/api/boards/${boardId}`);
      const data = await res.json();

      return data;
    },
    onSuccess(data) {
      onSuccessFn(data.board.columns);
    },
  });

  return { isLoading, isError, data, error };
}
