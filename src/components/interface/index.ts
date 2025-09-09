type createdAt = {
  email: string;
};

export interface Todo {
  id: string;
  name: string;
  description: string;
  createdBy: createdAt;
  createdAt: string;
  status: 'created' | 'progress' | 'completed' | 'pending';
}

export interface GetTodosData {
  todos: Todo[];
}

export interface GetTodosDataOfMe {
  todosByMe: Todo[];
}
