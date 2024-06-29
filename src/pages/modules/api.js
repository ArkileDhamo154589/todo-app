import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const fetchTasks = () => {
  return axios.get(`${baseURL}/tasks`);
};

export const addTask = (newTaskObj) => {
  return axios.post(`${baseURL}/tasks`, newTaskObj);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${baseURL}/tasks/${taskId}`);
};

export const updateTask = (taskId, updatedTaskObj) => {
  return axios.put(`${baseURL}/tasks/${taskId}`, updatedTaskObj);
};

export const updateTaskStatus = (taskId) => {
  return axios.put(`${baseURL}/tasks/${taskId}/status`, { status: 'completed' });
};
