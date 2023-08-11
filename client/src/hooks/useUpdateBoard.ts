import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditTask() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editTask } = useMutation({
    mutationFn: async () => new Promise(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (err) => console.log('Error'),
  });

  return { isEditing, editTask };
}
