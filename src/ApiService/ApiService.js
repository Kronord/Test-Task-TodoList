import axios from 'axios';

axios.defaults.baseURL = "http://localhost:9001";

export const getTodos = async () => {
    try {
        const tasks = await axios.get('/tasks').then(data => data);
        return tasks;
    } catch (error) {
        console.log(error);
    }
};

export const createTodo = async (task) => {
    try {
        await axios.post('/task/create', task);
    } catch (error) {
        console.log(error);
    }
};

export const deleteTodo = async (id) => {
    try {
        await axios.delete(`/task/delete/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const getOneTodo = async (id) => {
    try {
        const specificTask = await axios.get(`/task/${id}`).then(data => data);
        return specificTask;
    } catch (error) {
        console.log(error);
    }
};

export const updateTodo = async (body) => {
    try {
        await axios.post(`/task/update`, body);
    } catch (error) {
        console.log(error);
    }
};