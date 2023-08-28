export default function TaskInfo({ task }) {
  const subtaskTotal = task.subtasks.length;
  const subtaskDone = task.subTasks.reduce((acc, st) => acc + st.completed, 0);

  return (
    <div>
      <h4>{task.title}</h4>
      <p>{`${subtaskDone} of ${subtaskTotal} subtasks completed`}</p>
    </div>
  );
}
