import { useQuery } from '@tanstack/react-query';

export default function useLoadUserBoards() {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['userBoards'],
    queryFn: async () => {
      const res = await fetch('/api/boards/');

      if (res.status !== 200) {
        throw new Error('Something went wrong. Try reloading.');
      }

      const data = await res.json();
      return data;
    },
    retry: false,
  });

  return { isLoading, isError, data, error, refetch };
}
