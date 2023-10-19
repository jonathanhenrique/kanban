import { styled } from 'styled-components';
import NavItem from './NavItem';
import NewBoard from '../features/board/NewBoard';
import { SpinnerMiniR } from './SpinnerMini';
import { boardCacheType } from '../types/types';
import useLoadUserBoards from '../features/board/useLoadUserBoards';
import ErrorMessage from './ErrorMessage';
import { memo } from 'react';

const StyledNavList = styled.ul`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;

  border-bottom: var(--border-hairline);
`;

const Subtitle = styled.div`
  height: 2.4rem;
  padding: 0 1.8rem;
  line-height: 0;
  letter-spacing: 1px;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-300);

  display: flex;
  align-items: center;
  gap: 1rem;
`;

function MainNav() {
  const { isLoading, isError, data, refetch, error } = useLoadUserBoards();

  if (isError) {
    return (
      <ErrorMessage message={(error as Error).message} refresh={refetch} />
    );
  }

  return (
    <nav>
      <Subtitle>
        <span>all boards</span>
        {isLoading ? <SpinnerMiniR /> : <span>{`(${data?.length})`}</span>}
      </Subtitle>
      <StyledNavList>
        {data?.map((board: boardCacheType) => (
          <NavItem key={board.id} id={board.id}>
            {board.name}
          </NavItem>
        ))}
      </StyledNavList>
      <NewBoard />
    </nav>
  );
}

const MainNavMemo = memo(MainNav);

export default MainNavMemo;
