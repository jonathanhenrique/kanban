import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import SpinnerMini from '../../ui/SpinnerMini';
import { subtaskType } from '../../types/types';
import Subtask from '../../ui/StyledSubtask';
import useToggleSubtask from './useToggleSubtask';

export default function SubTaskDetails({ subtask }: { subtask: subtaskType }) {
  const { isUpdating, mutate } = useToggleSubtask(subtask);

  function handleToggleCompleted(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    mutate({ subtaskId: subtask.id, completed: !subtask.completed });
  }

  return (
    <Subtask
      disabled={isUpdating}
      $isCompleted={subtask.completed}
      onClick={handleToggleCompleted}
    >
      {subtask.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      <p style={{ opacity: isUpdating ? 0.3 : 1 }}>{subtask.description}</p>
      {isUpdating && <SpinnerMini />}
    </Subtask>
  );
}
