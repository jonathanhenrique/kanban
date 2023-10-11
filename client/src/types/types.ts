export type subtaskType = {
  id: string;
  description: string;
  completed: boolean;
  taskId: string;
};

export type taskType = {
  id: string;
  title: string;
  description?: string;
  order: number;
  columnId: string;
  subTasks: subtaskType[];
};

export type columnType = {
  id: string;
  name: string;
  boardId: string;
  tasks: taskType[];
};

export type boardType = {
  id: string;
  name: string;
  columns: columnType[];
};

export type columnsCacheType = {
  id: string;
  name: string;
}[];

export type columnCacheType = {
  id: string;
  name: string;
  boardId: string;
  tasks: string[];
};

export type IDType = string | undefined;
