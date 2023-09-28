import {
  HiBars3,
  HiMiniChevronDown,
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
  HiPlusSmall,
} from 'react-icons/hi2';
import { styled } from 'styled-components';
import Button from './formUI/Button';
import Modal from './Modal';
import NewTask from '../features/task/NewTask';
import Logo from './Logo';
import FloatMenu from './FloatMenu';
import { useGlobalUI } from '../utils/GlobalUI';
import IconButton from './formUI/IconButton';
import MainNav from './MainNav';
import { useParams } from 'react-router-dom';
import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query';
import { boardType } from '../types/types';
import { SpinnerMiniR } from './SpinnerMini';
import FloatMenuConfirmation from './FloatMenuConfirmation';

const StyledHeader = styled.header`
  height: 64px;
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border-hairline);
  background-color: var(--color-grey-700);
  position: relative;

  & h1 {
    font-weight: 400;
    font-size: 2rem;
    line-height: 0;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 8rem;
`;

const HeaderWrapperFull = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function Header() {
  const { boardId } = useParams();
  const { sidebarOpen, toggleSidebar, setBoardLocked } = useGlobalUI();
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ['userBoards'] });

  const data = !isFetching
    ? queryClient.getQueryData<{ boards: boardType[] }>(['userBoards'])
    : null;
  const board = data?.boards.find((b: boardType) => b.id === boardId);

  return (
    <StyledHeader id="header">
      <HeaderWrapper>
        <IconButton onClick={toggleSidebar}>
          <HiBars3 />
        </IconButton>
        <Logo />
      </HeaderWrapper>
      <HeaderWrapperFull>
        {isFetching ? <SpinnerMiniR /> : <h1>{board?.name || 'Boards'}</h1>}
        {!sidebarOpen && (
          <FloatMenu
            relativeTo="header"
            fn={setBoardLocked}
            identifier="boards-header"
            icon={<HiMiniChevronDown />}
            fineTunePosition={[-110, 52]}
          >
            <MainNav />
          </FloatMenu>
        )}
      </HeaderWrapperFull>
      <Modal.Trigger opens="newTask">
        <Button variation="primary">
          <HiPlusSmall />
          <span>new task</span>
        </Button>
      </Modal.Trigger>

      <Modal.Content name="newTask">
        <NewTask />
      </Modal.Content>
    </StyledHeader>
  );
}
