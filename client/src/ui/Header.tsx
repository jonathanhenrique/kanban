import { HiBars3, HiMiniChevronDown, HiPlusSmall } from 'react-icons/hi2';
import { styled } from 'styled-components';
import Button from './Button';
import Modal from './Modal';
import AddNewTask from './AddNewTask';
import Logo from './Logo';
import HeaderMenu from './HeaderMenu';
import { useGlobalUI } from '../utils/GlobalUI';
import IconButton from './IconButton';
import MainNav from './MainNav';

const StyledHeader = styled.header`
  height: 64px;
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border-hairline);
  background-color: var(--color-grey-700);

  & h1 {
    font-weight: 400;
    font-size: 2rem;
    line-height: 0;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 8rem;
`;

const HeaderWrapperFull = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function Header() {
  const { sidebarOpen, toggleSidebar } = useGlobalUI();

  return (
    <StyledHeader>
      <HeaderWrapper>
        <IconButton onClick={toggleSidebar}>
          <HiBars3 />
        </IconButton>
        <Logo />
      </HeaderWrapper>
      <HeaderWrapperFull>
        <h1>This is the Title</h1>
        {!sidebarOpen && (
          <HeaderMenu icon={<HiMiniChevronDown />}>
            <MainNav />
          </HeaderMenu>
        )}
      </HeaderWrapperFull>
      <Modal.Trigger opens="newTask">
        <Button type="primary">
          <HiPlusSmall />
          <span>new task</span>
        </Button>
      </Modal.Trigger>

      <Modal.Content name="newTask">
        <AddNewTask />
      </Modal.Content>
    </StyledHeader>
  );
}
