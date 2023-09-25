type StateType = {
  title: string;
  description: string;
  subtasks: string[];
  columnId: string;
};

type ChangeColumnType = {
  index: number;
  input: string;
};

type ActionType = {
  type:
    | 'changeTitle'
    | 'changeDescription'
    | 'newSubtask'
    | 'deleteSubtask'
    | 'changeColumn'
    | 'updateSubtask';
  payload?: string | number | ChangeColumnType;
};

const initialState: StateType = {
  title: '',
  description: '',
  subtasks: ['', ''],
  columnId: '',
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'changeTitle':
      return { ...state, title: action.payload as string };
    case 'changeDescription':
      return { ...state, description: action.payload as string };
    case 'newSubtask':
      return { ...state, subtasks: [...state.subtasks, ''] };
    case 'deleteSubtask': {
      const newState = [...state.subtasks];
      newState.splice(action.payload as number, 1);
      return { ...state, subtasks: newState };
    }
    case 'updateSubtask': {
      const newState = [...state.subtasks];
      newState[(action.payload as ChangeColumnType).index] = (
        action.payload as ChangeColumnType
      ).input;
      return { ...state, subtasks: newState };
    }
    case 'changeColumn': {
      return { ...state, columnId: action.payload as string };
    }
    default:
      throw new Error('Action not found');
  }
}

export { reducer, initialState };
