export function validateNewTask(
  title: string,
  description: string,
  subtasks: string[]
) {
  const errorMessages: string[] = [];

  if (!title) errorMessages.push('title is required');
  if (title.length < 3 || title.length > 255) {
    errorMessages.push('title should be between 3 and 255 characters');
  }
  if (description && description.length > 255) {
    errorMessages.push('description should be at most 255 characters');
  }
  if (subtasks.length > 0) {
    const testedSubtasks = subtasks.filter((st) => st.length > 255);
    if (testedSubtasks.length > 0) {
      errorMessages.push('subtask should be at most 255 characters');
    }
  }

  return errorMessages;
}
