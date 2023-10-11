import { useQuery } from '@tanstack/react-query';
import { columnCacheType } from '../../types/types';
import { useParams } from 'react-router-dom';

export default function useGetColumn(columnId: string) {
  const { boardId } = useParams();
  const { data } = useQuery<columnCacheType>({
    queryKey: [boardId, columnId],
  });

  return { data };
}
