import { styled } from 'styled-components';

const TaskInfoStyled = styled.div`
  & h4 {
    font-weight: 400;
    font-size: 1.6rem;
  }

  & > p {
    color: var(--color-grey-300);
    font-size: 1.4rem;
  }
`;

export default function TaskInfo({ task }) {
  const taskTitle = task.title;
  const subtaskTotal = task.subTasks.length;
  const subtaskDone = task.subTasks.reduce((acc, st) => acc + st.completed, 0);

  return (
    <TaskInfoStyled>
      <h4>{taskTitle}</h4>
      <p>{`${subtaskDone} of ${subtaskTotal} subtasks completed`}</p>
    </TaskInfoStyled>
  );
}
