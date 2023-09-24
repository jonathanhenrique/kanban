import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import SubTaskDetails from './SubTaskDetails';
import { subtaskType } from '../types/types';

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  font-weight: 600;
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
  }
`;

export default function TaskDetails({ currTask }: { currTask: string }) {
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
    // onSuccess(data) {
    //  console.log(data);
    // },
    refetchOnMount: true,
  });

  if (loadingTask) return <p>Loading...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  const totalSubtasks = data?.task.subTasks.length;
  const subtasksCompleted = data?.task.subTasks.reduce(
    (acc: number, item: subtaskType) => acc + (item.completed ? 1 : 0),
    0
  );

  return (
    <StyledForm>
      <Heading>
        This is the Title of the Task and it should be bigger than 15 words this
        is good
      </Heading>
      <Description>
        This is the Title of the Task and it should be bigger than 15 words,
        This is the Title of the Task and it should be bigger than 15 words,
        This is the Title of the Task and it should be bigger than 15 words
      </Description>
      <Heading>{`Subtasks completed (${subtasksCompleted} of ${totalSubtasks})`}</Heading>
      {data.task.subTasks.map((st: subtaskType) => {
        return <SubTaskDetails key={st.id} subtask={st} />;
      })}
    </StyledForm>
  );
}
