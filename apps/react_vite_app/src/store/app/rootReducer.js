// Combinación de todos los reducers
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todosReducer from '../features/todos/todosSlice';
import usersReducer from '../features/users/usersSlice';

export default combineReducers({
    auth: authReducer,
    todos: todosReducer,
    users: usersReducer,
})