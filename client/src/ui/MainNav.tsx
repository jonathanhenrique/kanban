import { styled } from 'styled-components';
import NavItem from './NavItem';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner';
import { NavLink } from 'react-router-dom';
import { NewBoard } from './NewBoard';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  color: var(--color-grey-300);
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

// const StyledNavLink = styled(NavLink)`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }

//   /* This works because react-router places the active class on the active NavLink */
//   &:hover,
//   &:active,
//   &.active:link,
//   &.active:visited {
//     color: var(--color-grey-800);
//     background-color: var(--color-grey-50);
//     border-radius: var(--border-radius-sm);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }

//   &:hover svg,
//   &:active svg,
//   &.active:link svg,
//   &.active:visited svg {
//     color: var(--color-brand-600);
//   }
// `;

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
        <NewBoard />
      </NavList>
    </nav>
  );
}
