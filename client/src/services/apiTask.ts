export async function changeOrder(taskId, newPosition) {
  const res = await fetch('/api/tasks/', {
    method: 'PATCH',
    body: JSON.stringify({ taskId, newPosition }),
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
