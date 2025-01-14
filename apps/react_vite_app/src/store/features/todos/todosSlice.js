import {createSlice} from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        // reducers aquí
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);

            if(todo){
                todo.completed = !todo.completed;
            }
        }
    }
});