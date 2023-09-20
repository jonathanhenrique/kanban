import { styled } from 'styled-components';
import MainNav from './MainNav';
import { useGlobalUI } from './GlobalUI';

const StyledSidebar = styled.aside`
  /* grid-row: 1 / -1; */
  width: 256px;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  padding: 4rem 0rem 4rem 1.5rem;
  border-right: 1px solid var(--color-border-dark);

  background-color: var(--color-grey-700);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;

  transition: all 300ms var(--bezier-ease-out);

  &.closed {
    margin-left: -256px;
  }
`;

export default function Sidebar() {
  const { sidebarOpen } = useGlobalUI();

  return (
    <StyledSidebar className={!sidebarOpen && 'closed'}>
      <MainNav />
    </StyledSidebar>
  );
}
