import { HiBars3, HiMiniChevronDown } from 'react-icons/hi2';
import { styled } from 'styled-components';
import Logo from './Logo';
import FloatMenu from './FloatMenu';
import { useGlobalUI } from '../utils/GlobalUI';
import IconButton from './formUI/IconButton';
import MainNav from './MainNav';
import { SpinnerMiniR } from './SpinnerMini';
import useLoadUserBoards from '../features/board/useLoadUserBoards';
import { useParams } from 'react-router-dom';
import HeaderActions from './formUI/HeaderActions';

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
  const { data, isLoading } = useLoadUserBoards();
  const { sidebarOpen, toggleSidebar } = useGlobalUI();

  const currBoard = data
    ? data.boards.find(
        (board: { id: string; name: string; createdAt: string }) =>
          board.id === boardId
      )
    : null;

  return (
    <StyledHeader id="header">
      <HeaderWrapper>
        <IconButton onClick={toggleSidebar}>
          <HiBars3 />
        </IconButton>
        <Logo />
      </HeaderWrapper>
      <HeaderWrapperFull>
        {isLoading ? <SpinnerMiniR /> : <h1>{currBoard?.name || 'Boards'}</h1>}
        {!sidebarOpen && (
          <FloatMenu
            icon={<HiMiniChevronDown />}
            fineTunePosition={[200, 64]}
            origin="top center"
          >
            <div style={{ width: '264px', padding: '2rem 1rem' }}>
              <MainNav />
            </div>
          </FloatMenu>
        )}
      </HeaderWrapperFull>
      <HeaderActions />
    </StyledHeader>
  );
}
