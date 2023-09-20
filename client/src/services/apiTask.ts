export async function changeOrder(taskId, newPosition, newColumnId) {
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

export async function createTask(newTask) {
  const res = await fetch('/api/tasks/', {
    method: 'POST',
    body: JSON.stringify(newTask),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
}

export async function toggleCompleted(subtaskId, completed) {
  const res = await fetch(`/api/subtasks/${subtaskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) throw new Error('An error occurs');
}
