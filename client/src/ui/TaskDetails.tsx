import { useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
import SubTaskDetails from './SubTaskDetails';

const Heading = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: var(--color-grey-300);
`;

const StyledForm = styled.form`
  width: 50rem;
`;

export default function TaskDetails({ task }) {
  const {
    isLoading: loadingTask,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ['currTask'],
    queryFn: async () => {
      const res = await fetch(`/api/tasks/${task.id}`);
      const data = await res.json();

      return data;
    },
    onSuccess(data) {
      // console.log(data);
    },
  });

  if (loadingTask) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <StyledForm>
      <Heading>
        This is the Title of the Task and it should be bigger than 15 words
      </Heading>
      <Description>{task.description}</Description>
      <h3>Subtasks (2 of 3)</h3>
      {data.task.subTasks.map((st) => {
        return <SubTaskDetails key={st.id} subtask={st} />;
      })}
    </StyledForm>
  );
}
