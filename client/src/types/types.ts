export type taskType = {
  task: string;
  subtasks: [{ subtask: string; done: boolean }];
};

export type subtaskType = { subtask: string; done: boolean };
