import Modal from './Modal';
import {
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
  HiPlusSmall,
} from 'react-icons/hi2';
import Button from './formUI/Button';
import FloatMenuConfirmation from './FloatMenuConfirmation';
import useColumns from '../features/column/useColumns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NewTask from '../features/task/NewTask';
import useDeleteBoard from '../features/board/useDeleteBoard';

export default function HeaderActions() {
  const { boardId } = useParams();
  const [confirm, setConfirm] = useState('idle');
  const { data: columns } = useColumns(boardId ?? '');
  const { mutate } = useDeleteBoard();

  const disableNewTask = !(columns && columns.length > 0);

  function deleteBoardHandler() {
    if (!boardId) return;
    mutate(boardId);
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
        disabled={boardId === undefined}
      >
        <div style={{ padding: '1rem 1.2rem' }}>
          <Button variation="mini" onClick={() => setConfirm('toConfirm')}>
            <HiMiniTrash />
            <span>delete board</span>
          </Button>
          <Button disabled={true} variation="mini">
            <HiMiniWrenchScrewdriver />
            <span>edit board</span>
          </Button>
        </div>
      </FloatMenuConfirmation>
      <Modal.Content name="newTask">
        <NewTask />
      </Modal.Content>
    </div>
  );
}
