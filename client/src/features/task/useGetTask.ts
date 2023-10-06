import { useQuery } from '@tanstack/react-query';
import { taskType } from '../../types/types';

export default function useGetTask(taskId: string) {
  const { isLoading, data } = useQuery<taskType>({
    queryKey: ['task', taskId],
    select(data) {
      return data;
    },
  });

  return { data, isLoading };
}
