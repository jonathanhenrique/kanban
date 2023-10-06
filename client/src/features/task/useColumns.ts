import { useQuery } from '@tanstack/react-query';
import { boardType } from '../../types/types';

export default function useColumns(boardId: string) {
  const { isLoading, data } = useQuery({
    queryKey: ['columns', boardId],
    select(data) {
      return data;
    },
  });

  return { data, isLoading };
}
