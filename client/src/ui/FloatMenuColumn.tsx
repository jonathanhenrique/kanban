import {
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
} from 'react-icons/hi2';
import Button from './formUI/Button';
import { useState } from 'react';
import FloatMenuConfirmation from './FloatMenuConfirmation';

export default function FloatMenuColumn() {
  const [confirm, setConfirm] = useState('idle');

  return (
    <FloatMenuConfirmation
      relativeTo="board"
      fineTunePosition={[-175, 15]}
      identifier={`column-${title}`}
      icon={<HiMiniEllipsisVertical />}
    >
      <div style={{ padding: '1rem 1.2rem' }}>
        <Button variation="mini" onClick={() => setConfirm('toConfirm')}>
          <HiMiniTrash />
          <span>delete column</span>
        </Button>
        <Button disabled={true} variation="mini">
          <HiMiniWrenchScrewdriver />
          <span>edit column</span>
        </Button>
      </div>
    </FloatMenuConfirmation>
  );
}
