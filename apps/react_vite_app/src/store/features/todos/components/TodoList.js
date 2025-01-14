import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, toggleTodo} from '../todosSlice';

export function TodoList(){
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const handleAddTodo = (text) => {
        dispatch(addTodo({id: Date.now(), text, completed: false}));
    }

    return (
        <div>
            <button onClick={() => handleAddTodo('Nueva tarea')}>
                Añadir Tarea
            </button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} onClick={()=>dispatch(toggleTodo(todo.id))} 
                        style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}