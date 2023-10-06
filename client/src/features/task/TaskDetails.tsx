import { styled } from 'styled-components';
import SubTaskDetails from '../subtask/SubTaskDetails';
import { subtaskType } from '../../types/types';
import useGetTask from './useGetTask';

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.4rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-300);
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  width: 50rem;
`;

export default function TaskDetails({ taskId }: { taskId: string }) {
  const { data: task } = useGetTask(taskId);

  const totalSubtasks = task?.subTasks.length;
  const subtasksCompleted = task?.subTasks.reduce(
    (acc: number, item: subtaskType) => acc + (item.completed ? 1 : 0),
    0
  );

  return (
    <StyledForm>
      <Heading>{task?.title}</Heading>
      <Description>{task?.description}</Description>
      <Heading>{`Subtasks completed (${subtasksCompleted} of ${totalSubtasks})`}</Heading>
      {task?.subTasks.map((st: subtaskType) => {
        return <SubTaskDetails key={st.id} subtask={st} />;
      })}
    </StyledForm>
  );
}
