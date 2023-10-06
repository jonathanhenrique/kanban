import { useQuery } from '@tanstack/react-query';

export default function useBoard(columnId: string) {
  const { data } = useQuery({
    queryKey: ['column', columnId],
    // enabled: false,
  });

  return { data };
}
