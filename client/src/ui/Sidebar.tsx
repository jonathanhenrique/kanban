import { styled } from 'styled-components';
import { useGlobalUI } from '../utils/GlobalUI';
import MainNav from './MainNav';
import DarkModeToggle from './DarkModeToggle';

type Props = { $closed: boolean };

const StyledSidebar = styled.aside<Props>`
  flex: 0 0 264px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2rem 1rem;
  border-right: var(--border-hairline);
  background-color: var(--color-grey-700);

  transition: margin-left 300ms var(--bezier-ease-out);

  margin-left: ${(props) => (props.$closed ? '-264px' : 0)};
`;

export default function Sidebar() {
  const { sidebarOpen } = useGlobalUI();

  return (
    <StyledSidebar $closed={!sidebarOpen}>
      <MainNav />
      <DarkModeToggle />
    </StyledSidebar>
  );
}
