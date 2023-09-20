import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';

import NavItem from './NavItem';
import Spinner from './Spinner';
import NewBoard from './NewBoard';

const NavList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  color: var(--color-grey-300);
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

export default function MainNav({ floated = false }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['userBoards'],
    queryFn: async () => {
      const res = await fetch('/api/boards/');
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;

  return (
    <nav>
      {!floated && <Subtitle>{`all boards (${data.boards.length})`}</Subtitle>}
      <NavList>
        {data.boards.map((board) => (
          <NavItem key={board.id} id={board.id}>
            {board.name}
          </NavItem>
        ))}
      </NavList>
      <NewBoard />
    </nav>
  );
}
