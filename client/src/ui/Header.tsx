import { styled } from 'styled-components';
import Button from './Button';
import Modal from './Modal';
import AddNewTask from './AddNewTask';
import Logo from './Logo';
import { HiBars3 } from 'react-icons/hi2';
import { FloatMainNav } from './FloatMainNav';
import { useGlobalUI } from './GlobalUI';
import IconButton from './IconButton';

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

export default function Header() {
  const { sidebarOpen, toggleSidebar } = useGlobalUI();

  return (
    <StyledHeader>
      <div
        style={{
          minWidth: '256px',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginRight: '1rem',
        }}
      >
        <IconButton onClick={toggleSidebar}>
          <HiBars3 />
        </IconButton>
        <Logo />
      </div>
      <div
        style={{
          flex: '1 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h1>This is the Title</h1>
        {!sidebarOpen && <FloatMainNav />}
      </div>
      <Modal.Trigger opens="newTask">
        <Button>+ new task</Button>
      </Modal.Trigger>

      <Modal.Content name="newTask">
        <AddNewTask />
      </Modal.Content>
    </StyledHeader>
  );
}
