import { styled } from 'styled-components';
import MiniForm from '../../ui/formUI/MiniForm';
import useCreateColumn from './useCreateColumn';
import { useParams } from 'react-router-dom';

const NewColumnStyled = styled.div`
  flex: 0 0 30rem;
  padding: 2rem;
  background-color: var(--color-grey-700);
  margin-top: 6rem;
  height: 18rem;
  border-radius: var(--border-radius-lg);
`;

export default function NewColumn() {
  const { boardId } = useParams();
  const { isCreating, mutate, isError, error, reset } = useCreateColumn(
    boardId ? boardId : ''
  );

  function newColumn(name: string) {
    if (!boardId) return;
    mutate({ name, boardId });
  }

  return (
    <NewColumnStyled>
      <MiniForm
        placeholder="Column Name"
        buttonText="New Column"
        minWidth="240px"
        centered={true}
        action={newColumn}
        loading={isCreating}
        error={isError ? (error as TypeError).message : null}
        reset={reset}
      />
    </NewColumnStyled>
  );
}
