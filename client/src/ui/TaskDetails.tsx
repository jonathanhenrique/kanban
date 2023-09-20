import { useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
import SubTaskDetails from './SubTaskDetails';

const Heading = styled.h2`
  font-weight: 400;
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-300);
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  width: 50rem;

  & > h3 {
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

export default function TaskDetails({ currTask }) {
  const {
    isLoading: loadingTask,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ['currTask'],
    queryFn: async () => {
      const res = await fetch(`/api/tasks/${currTask}`);
      const data = await res.json();

      return data;
    },
    onSuccess(data) {
      // console.log(data);
    },
    refetchOnMount: true,
  });

  if (loadingTask) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <StyledForm>
      <Heading>
        This is the Title of the Task and it should be bigger than 15 words
      </Heading>
      <Description>
        This is the Title of the Task and it should be bigger than 15 words,
        This is the Title of the Task and it should be bigger than 15 words,
        This is the Title of the Task and it should be bigger than 15 words
      </Description>
      <Heading>Subtasks completed (2 of 3)</Heading>
      {data.task.subTasks.map((st) => {
        return <SubTaskDetails key={st.id} subtask={st} />;
      })}
    </StyledForm>
  );
}
