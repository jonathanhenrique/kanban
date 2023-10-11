import { styled } from 'styled-components';
import FloatMenuConfirmation from '../../ui/FloatMenuConfirmation';
import {
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
} from 'react-icons/hi2';
import Button from '../../ui/formUI/Button';
import { useState } from 'react';

type ColumnHeaderProps = {
  title: string;
  deleteColumn: () => void;
};

const StyledColumnHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export default function ColumnHeader({
  title,
  deleteColumn,
}: ColumnHeaderProps) {
  const [confirm, setConfirm] = useState('idle');

  return (
    <StyledColumnHeader>
      <h3>{title}</h3>
      <FloatMenuConfirmation
        fineTunePosition={[127, 15]}
        icon={<HiMiniEllipsisVertical />}
        actionOnConfirmation={deleteColumn}
        confirm={confirm}
        setConfirm={setConfirm}
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
    </StyledColumnHeader>
  );
}
