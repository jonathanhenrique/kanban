import { HiMoon, HiSun } from 'react-icons/hi2';
import { styled } from 'styled-components';
import { useGlobalUI } from '../utils/GlobalUI';
import MainNav from './MainNav';
import Toggle from './Toggle';
import DarkModeToggle from './DarkModeToggle';

type Props = { $closed: boolean };

const StyledSidebar = styled.aside<Props>`
  width: 264px;
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
  const { sidebarOpen, darkTheme, toggleTheme } = useGlobalUI();

  return (
    <StyledSidebar $closed={!sidebarOpen}>
      <MainNav />
      <DarkModeToggle>
        <HiMoon
          style={{
            fill: darkTheme ? 'var(--color-1)' : 'hsl(219, 15%, 63%)',
          }}
        />
        <Toggle on={darkTheme} toggle={toggleTheme} />
        <HiSun
          style={{
            height: '2rem',
            width: '2rem',
            fill: !darkTheme ? 'var(--color-1)' : 'hsl(219, 15%, 63%)',
          }}
        />
      </DarkModeToggle>
    </StyledSidebar>
  );
}
