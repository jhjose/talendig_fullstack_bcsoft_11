import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const todoService = {
    getAll: () => api.get('/todos'),
    create: (todo) => api.post('/todos', todo);
}