export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface GetTodosData {
  todos: Todo[];
}
