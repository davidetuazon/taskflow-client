import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000";
const BASE_PATH = `${BASE_URL}/api/v2`;

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
    } catch (e: any) {
        console.log(e);
        if (e.response?.data?.error) {
            throw new Error(e.response.data.error);
        }
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

export const getTaskOverview = async () => {
    try {
        const res = await api.get('/analytics/overview');
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch task");
    }
}

export const getFeed = async (option: string) => {
    try {
        const res = await api.get('/feed', { params: { filter: option, limit: 3 } });
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch feed");
    }
}

export const fetchProjects = async () => {
    try {
        const res = await api.get('/projects');
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch projects");
    }
}

export const createProject = async (params: {
    title: string,
    description: string,
    members?: string[],
}) => {
    try {
        const res = await api.post('/projects', params, {});
        return res.data;
    } catch (e: any) {
        console.log(e);
        if (e.response?.data?.error) {
            throw new Error(e.response.data.error);
        }
        throw new Error("Failed to create new project");
    }
}

export const updateProject = async (slug: string, params: {
    title: string,
    description: string,
}) => {
    try {
        const res = await api.put(`/projects/${slug}`, params, {});
        return res.data;
    } catch (e) {
        throw new Error("Failed to update project details");
    }
}

export const getProject = async (slug: string) => {
    try {
        const res = await api.get(`/projects/${slug}`);
        return res.data;
    } catch (e) {
        throw new Error("Failed to get project");
    }
} 

export const listTask = async (slug: string, params: any) => {
    try {
        const res = await api.get(`/projects/${slug}/tasks`, { params });
        return res.data;
    } catch (e) {
        throw new Error("Failed to fetch task list");
    }
}

export const createTask = async (slug: string, params: {
    title: string,
    description: string,
    dueDate: string
    assignedTo: string
}) => {
    try {
        const res = await api.post(`/projects/${slug}/tasks`, params, {});
        return res.data;
    } catch (e) {
        throw new Error("Failed to create new task");
    }
}

// export const getMembers = async (id: string, members: any) => {
//     try {
//         const res = await api.get(`/projects/${id}/members`, members);
//         return res.data;
//     } catch (e) {
//         throw new Error("Failed to fetch members");
//     }
// }










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

// export const createTask = async (params: {
//     title: string,
//     description: string,
//     status: string,
//     dueDate: string,
// }) => {
//     try {
//         const res = await api.post('/tasks', params, {});
//         return res.data;
//     } catch (e) {
//         throw new Error("Failed to create new task");
//     }
// }