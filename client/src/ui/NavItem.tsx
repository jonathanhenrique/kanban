import { styled } from 'styled-components';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';

const StyledItem = styled.li`
  padding: 1rem 0;
  color: var(--color-grey-300);
  display: flex;
  align-items: center;
  gap: 1rem;

  & span {
    line-height: 0;
  }

  & svg {
    height: 2rem;
    width: 2rem;
  }
`;

export default function NavItem({ children }: { children: string }) {
  return (
    <StyledItem>
      <span>
        <HiOutlineSquares2X2 />
      </span>{' '}
      {children}
    </StyledItem>
  );
}
