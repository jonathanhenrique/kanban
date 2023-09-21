import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';

import NavItem from './NavItem';
import NewBoard from './NewBoard';
import { SpinnerMiniR } from './SpinnerMini';

const NavList = styled.ul`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
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
      const data = await res.json();
      return data;
    },
  });

  if (isError) return <p>An error occurs try to reload the page</p>;

  return (
    <nav>
      <Subtitle>
        <span>all boards</span>
        {isLoading ? (
          <SpinnerMiniR />
        ) : (
          <span>{`(${data.boards.length})`}</span>
        )}
      </Subtitle>
      <NavList>
        {data?.boards?.map((board: { id: string; name: string }) => (
          <NavItem key={board.id} id={board.id}>
            {board.name}
          </NavItem>
        ))}
      </NavList>
      <NewBoard />
    </nav>
  );
}
