// Board API calls -----------------------------------------------------------------

export async function loadBoard(boardId: string) {
  const res = await fetch(`/api/boards/${boardId}`);

  if (res.status !== 200) {
    throw new Error('Something went wrong. Try again latter.');
  }
  const data = await res.json();

  return data;
}

export async function deleteBoard(boardId: string) {
  const res = await fetch(`/api/boards/${boardId}`, {
    method: 'DELETE',
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }

  const data = await res.json();
  return data;
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

  const data = await res.json();
  return data;
}

// Drag and Drop API call ----------------------------------------------------------

export async function changeOrder(
  taskId: string,
  newPosition: number,
  newColumnId: string | null
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

  if (res.status !== 200) {
    throw new Error('Something went wrong. Try again latter.');
  }
}

// Column API calls ----------------------------------------------------------------

export async function getColumn(columnId: string) {
  const res = await fetch(`/api/columns/${columnId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }

  const data = await res.json();

  return data;
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

  const data = await res.json();
  return data;
}

export async function deleteColumn(columnId: string) {
  const res = await fetch(`/api/columns/${columnId}`, {
    method: 'DELETE',
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }
}

// Task API calls -----------------------------------------------------------------

export async function getTask(taskId: string) {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }

  const data = await res.json();

  return data;
}

export async function createTask(newTask: {
  title: string;
  description: string;
  subTasks: string[];
  columnId: string;
}) {
  const res = await fetch('/api/tasks/', {
    method: 'POST',
    body: JSON.stringify(newTask),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
  const data = await res.json();
  return data;
}

export async function deleteTask(taskId: string) {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong, try again latter.');
  }
}

// Subtask API calls --------------------------------------------------------------

export async function toggleCompleted({
  subtaskId,
  completed,
}: {
  subtaskId: string;
  completed: boolean;
}) {
  const res = await fetch(`/api/subtasks/${subtaskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
  const data = await res.json();
  return data;
}
