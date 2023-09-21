import { styled } from 'styled-components';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

const StyledItem = styled(NavLink)`
  padding: 1rem 1.4rem;
  border-radius: var(--border-radius-lg);
  color: var(--color-grey-300);
  display: flex;
  align-items: center;
  gap: 1.2rem;

  transition: background-color 100ms linear;

  &:hover {
    background: var(--color-grey-500);
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  & span {
    line-height: 0;
  }

  & svg {
    transition: all 200ms var(--bezier-ease-out);
    height: 2rem;
    width: 2rem;
  }

  &.active {
    color: #f8fafc;
    background: linear-gradient(90deg, var(--color-1), var(--color-2));
  }
`;

export default function NavItem({
  children,
  id,
}: {
  children: string;
  id: string;
}) {
  return (
    <StyledItem to={`/app/${id}`}>
      <span>
        <HiOutlineSquares2X2 />
      </span>
      {children}
    </StyledItem>
  );
}
