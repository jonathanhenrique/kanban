import { styled, css } from 'styled-components';
import MainNav from './MainNav';
import { useGlobalUI } from './GlobalUI';

type Props = { closed?: boolean };

const StyledSidebar = styled.aside<Props>`
  width: 270px;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  padding: 4rem 1rem;
  border-right: var(--border-hairline);
  background-color: var(--color-grey-700);

  transition: margin-left 300ms var(--bezier-ease-out);

  ${(props) =>
    props.closed &&
    css`
      margin-left: -270px;
    `}
`;

export default function Sidebar() {
  const { sidebarOpen } = useGlobalUI();

  return (
    <StyledSidebar closed={!sidebarOpen}>
      <MainNav />
    </StyledSidebar>
  );
}
