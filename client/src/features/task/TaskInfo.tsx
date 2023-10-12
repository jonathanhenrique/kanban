import { styled } from 'styled-components';
import useGetTask from './useGetTask';

const TaskInfoStyled = styled.div`
  & h4 {
    font-weight: 400;
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }

  & > p {
    color: var(--color-grey-300);
    font-size: 1.4rem;
  }
`;

export default function TaskInfo({ taskId }: { taskId: string }) {
  const { data: task } = useGetTask(taskId);

  if (!task) return null;

  const title = task.title;
  const total = task.subTasks.length;
  const completed = task.subTasks.reduce(
    (acc, st) => acc + (st.completed ? 1 : 0),
    0
  );

  return (
    <TaskInfoStyled>
      <h4>{title}</h4>
      <p>{`${completed} of ${total} subtasks completed`}</p>
    </TaskInfoStyled>
  );
}
