import { styled } from 'styled-components';
import { useGlobalUI } from '../utils/GlobalUI';
import { HiMoon, HiSun } from 'react-icons/hi2';
import Toggle from './Toggle';

const StyledDarkModeToggle = styled.div`
  align-self: center;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 2rem;

  & > svg {
    transition: fill 200ms 100ms linear;
    height: 1.7rem;
    width: 1.7rem;
  }
`;

export default function DarkModeToggle() {
  const { darkTheme, toggleTheme } = useGlobalUI();

  return (
    <StyledDarkModeToggle>
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
    </StyledDarkModeToggle>
  );
}
