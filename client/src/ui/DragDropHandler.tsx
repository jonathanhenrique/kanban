import { styled } from 'styled-components';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type Props = {
  dndProps: DraggableProvidedDragHandleProps | null | undefined;
};

const StyledDragDropHandler = styled.div`
  position: absolute;
  background-color: transparent;

  border-top-left-radius: var(--border-radius-lg);
  border-bottom-left-radius: var(--border-radius-lg);

  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
`;

export default function DragDropHandler({ dndProps }: Props) {
  return <StyledDragDropHandler {...dndProps} />;
}
