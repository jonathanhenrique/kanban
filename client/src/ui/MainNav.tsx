import { styled } from 'styled-components';
import NavItem from './NavItem';
import NewBoard from './NewBoard';
import { SpinnerMiniR } from './SpinnerMini';
import { boardType } from '../types/types';
import { useQuery } from '@tanstack/react-query';

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

export default function MainNav() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['userBoards'],
    queryFn: async () => {
      const res = await fetch('/api/boards/');
      if (res.status !== 200) throw new Error('Error');
      const data = await res.json();
      return data;
    },
    retry: false,
  });

  if (isError) {
    return (
      <p style={{ color: 'red' }}>An error occurred, Try to reload the page.</p>
    );
  }

  return (
    <nav>
      <Subtitle>
        <span>all boards</span>
        {isLoading ? (
          <SpinnerMiniR />
        ) : (
          <span>{`(${data?.boards?.length})`}</span>
        )}
      </Subtitle>
      <StyledNavList>
        {data?.boards?.map((board: boardType) => (
          <NavItem key={board.id} id={board.id}>
            {board.name}
          </NavItem>
        ))}
      </StyledNavList>
      <NewBoard />
    </nav>
  );
}
