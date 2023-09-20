import { styled } from 'styled-components';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

const StyledItem = styled(NavLink)`
  padding: 1rem 1.5rem;
  /* border-top-left-radius: 8px;
  border-bottom-left-radius: 8px; */
  border-radius: 8px;
  color: var(--color-grey-300);
  display: flex;
  align-items: center;
  gap: 1.2rem;

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
    color: var(--color-brand-600);
    background: linear-gradient(90deg, #d73b54, #cd3262);
  }
`;

export default function NavItem({ children, id }: { children: string }) {
  return (
    <StyledItem to={`/app/${id}`}>
      <span>
        <HiOutlineSquares2X2 />
      </span>{' '}
      {children}
    </StyledItem>
  );
}
