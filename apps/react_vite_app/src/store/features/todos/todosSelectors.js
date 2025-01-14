export const selectAllTodos = state => state.todos;
export const selectTodoById = (state, todoId) =>
    state.todos.find(todo => todo.id === todoId);