import { styled } from 'styled-components';
import MainNav from './MainNav';
import Logo from './Logo';

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  padding: 4rem 3rem;
  border-right: 1px solid var(--color-border-dark);

  background-color: var(--color-grey-700);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}
