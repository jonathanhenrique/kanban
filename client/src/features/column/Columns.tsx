import { Droppable } from 'react-beautiful-dnd';
import { memo } from 'react';
import Column from './Column';
import { columnsCacheType } from '../../types/types';

function Columns({ columns }: { columns: columnsCacheType }) {
  return (
    <>
      {columns.map((column) => {
        return (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided, snapshot) => (
              <Column
                provided={provided}
                columnId={column.id}
                isDraggingOver={snapshot.isDraggingOver}
              />
            )}
          </Droppable>
        );
      })}
    </>
  );
}

const ColumnsMemo = memo(Columns, (p, n) => {
  return p.columns.length === n.columns.length;
});

export default ColumnsMemo;
