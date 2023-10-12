import { useCreateBoard } from './useCreateBoard';
import MiniForm from '../../ui/formUI/MiniForm';

export default function NewBoard() {
  const { isCreatingBoard, mutate, isError, error, reset } = useCreateBoard();

  function newBoard(name: string) {
    mutate({ name });
  }

  return (
    <MiniForm
      buttonText="New Board"
      placeholder="Board Name"
      centered={false}
      action={newBoard}
      loading={isCreatingBoard}
      error={isError ? (error as TypeError).message : null}
      reset={reset}
    />
  );
}
