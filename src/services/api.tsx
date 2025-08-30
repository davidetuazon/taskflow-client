import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000";
const BASE_PATH = `${BASE_URL}/api/v1`;

const api = axios.create({
    baseURL: BASE_PATH,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export const login = async (email: string, password: string) => {
    try {
        const res = await api.post('/users/login', { email, password }, {});
        return res.data;
    } catch (e) {
        throw new Error("Login failed");
    }
}

export const register = async (params: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}) => {
    try {
        const res = await api.post('/users/register', params, {});
        return res.data;
    } catch (e) {
        throw new Error("Registration failed");
    }
}

export const me = async () => {
    try {
        const res = await api.get('/me');
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch me");
    }
}

export const fetchTask = async () => {
    try {
        const res = await api.get('/tasks');
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch task");
    }
}

export const searchTask = async (query: string) => {
    if (!query) return [];
    try {
        const res = await api.get(`/tasks/search?search=${query}`);
        return res.data;
    } catch (e) {
        throw new Error("Failed task look up");
    }
}

export const markTaskDone = async (id: string, params: { status: string }) => {
    try {
        const res = await api.put(`/tasks/${id}`, params, {});
        return res.data;
    } catch (e) {
        throw new Error("Failed task status update");
    }
}

export const deleteTask = async (id: string) => {
    try {
        const res = await api.delete(`/tasks/${id}`);
        return res.data;
    } catch (e) {
        throw new Error("Failed to delete task");
    }
}

export const updateTask = async (id: string, params: {
    title: string,
    description: string,
    status: string,
    dueDate: string,
}) => {
    try {
        const res = await api.put(`/tasks/${id}`, params, {});
        return res.data;
    } catch (e) {
        throw new Error("Failed to update task");
    }
}

export const createTask = async (params: {
    title: string,
    description: string,
    status: string,
    dueDate: string,
}) => {
    try {
        const res = await api.post('/tasks', params, {});
        return res.data;
    } catch (e) {
        throw new Error("Failed to create new task");
    }
}