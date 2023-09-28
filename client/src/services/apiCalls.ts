import { taskType } from '../types/types';

export async function changeOrder(
  taskId: string,
  newPosition: number,
  newColumnId: string
) {
  const res = await fetch('/api/tasks/', {
    method: newColumnId ? 'PUT' : 'PATCH',
    body: JSON.stringify(
      newColumnId
        ? { taskId, newPosition, newColumnId }
        : { taskId, newPosition }
    ),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
}

export async function createTask(newTask: taskType) {
  const res = await fetch('/api/tasks/', {
    method: 'POST',
    body: JSON.stringify(newTask),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
}

export async function createColumn(newColumn: {
  name: string;
  boardId: string;
}) {
  const res = await fetch('/api/columns/', {
    method: 'POST',
    body: JSON.stringify(newColumn),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }
}

export async function deleteColumn(columnId: string) {
  const res = await fetch(`/api/columns/${columnId}`, {
    method: 'DELETE',
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }
}

export async function createBoard(newBoard: { name: string }) {
  const res = await fetch('/api/boards/', {
    method: 'POST',
    body: JSON.stringify(newBoard),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }
}

export async function toggleCompleted(subtaskId: string, completed: boolean) {
  const res = await fetch(`/api/subtasks/${subtaskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
}
