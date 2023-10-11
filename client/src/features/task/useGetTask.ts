import { useQuery } from '@tanstack/react-query';
import { taskType } from '../../types/types';
import { useParams } from 'react-router-dom';

export default function useGetTask(taskId: string) {
  const { boardId } = useParams();
  const { data } = useQuery<taskType>({
    queryKey: [boardId, taskId],
    select(data) {
      return data;
    },
  });

  return { data };
}
