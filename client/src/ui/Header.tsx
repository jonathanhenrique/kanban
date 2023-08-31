import { styled } from 'styled-components';
import Button from './Button';
import Modal from './Modal';
import AddNewTask from './AddNewTask';
import { useQueryClient } from '@tanstack/react-query';
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid var(--color-border-dark);

  background-color: var(--color-grey-700);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;

  & h1 {
    font-weight: 500;
    font-size: 2rem;
  }
`;

export default function Header() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['currBoard']);

  return (
    <StyledHeader>
      <h1>{data ? data.board.name : 'loading'}</h1>
      <Modal.Trigger opens="newTask">
        <Button>+ add new task</Button>
      </Modal.Trigger>

      <Modal.Content name="newTask">
        <AddNewTask />
      </Modal.Content>
    </StyledHeader>
  );
}
