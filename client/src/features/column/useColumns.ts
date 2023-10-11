import { useQuery } from '@tanstack/react-query';
import { columnsCacheType } from '../../types/types';

export default function useColumns(boardId: string) {
  const { data, isLoading } = useQuery<columnsCacheType>({
    queryKey: [boardId, 'columns'],
  });

  return { data, isLoading };
}
