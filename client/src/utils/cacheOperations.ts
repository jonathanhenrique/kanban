import { taskType } from '../types/types';

const reorder = (list: taskType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const changeColumn = (
  source: taskType[],
  destination: taskType[],
  droppableSource: { index: number; droppableId: string },
  droppableDestination: { index: number; droppableId: string }
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: {
    [key: string]: taskType[];
  } = {};

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export { reorder, changeColumn };
