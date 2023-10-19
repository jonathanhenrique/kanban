import Modal from './Modal';
import {
  HiMiniArrowLeftOnRectangle,
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
  HiPlusSmall,
} from 'react-icons/hi2';
import Button from './formUI/Button';
import FloatMenuConfirmation from './FloatMenuConfirmation';
import useColumns from '../features/column/useColumns';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewTask from '../features/task/NewTask';
import useDeleteBoard from '../features/board/useDeleteBoard';
import { logout } from '../services/apiCalls';
import toast from 'react-hot-toast';

export default function HeaderActions() {
  const { boardId } = useParams();
  const [confirm, setConfirm] = useState('idle');
  const { data: columns } = useColumns(boardId ?? '');
  const { mutate } = useDeleteBoard();
  const navigate = useNavigate();

  const disableNewTask = !(columns && columns.length > 0);

  function deleteBoardHandler() {
    if (!boardId) return;
    mutate(boardId);
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
      <Modal.Trigger opens="newTask">
        <Button variation="primary" disabled={disableNewTask}>
          <HiPlusSmall />
          <span>new task</span>
        </Button>
      </Modal.Trigger>
      <FloatMenuConfirmation
        fineTunePosition={[-15, 52]}
        icon={<HiMiniEllipsisVertical />}
        actionOnConfirmation={deleteBoardHandler}
        confirm={confirm}
        setConfirm={setConfirm}
      >
        <Button
          disabled={boardId === undefined}
          variation="mini"
          onClick={() => setConfirm('toConfirm')}
        >
          <HiMiniTrash />
          <span>delete board</span>
        </Button>
        <Button disabled={true} variation="mini">
          <HiMiniWrenchScrewdriver />
          <span>edit board</span>
        </Button>
        <Button variation="mini" onClick={handleLogout}>
          <HiMiniArrowLeftOnRectangle />
          <span>Log out</span>
        </Button>
      </FloatMenuConfirmation>
      <Modal.Content name="newTask">
        <NewTask />
      </Modal.Content>
    </div>
  );
}
