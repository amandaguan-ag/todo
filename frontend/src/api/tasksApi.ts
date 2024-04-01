import axios from "axios";

interface TaskData {
  description: string;
  priority: string; 
  tagNames?: string[]; 
}

const BASE_URL = "http://localhost:3005";

interface TaskData {
  description: string;
  priority: string;
  tagNames?: string[];
}

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data; 
};

export const addTask = async (taskData: TaskData) => {
  const response = await axios.post(`${BASE_URL}/task`, taskData);
  return response.data; 
};

export const updateTaskDescription = async (
  taskId: number,
  description: string
) => {
  const response = await axios.patch(`${BASE_URL}/task/${taskId}/description`, {
    description,
  });
  return response.data;
};

export const toggleTaskCompletion = async (taskId: number) => {
  const response = await axios.patch(`${BASE_URL}/task/${taskId}/completion`);
  return response.data;
};

export const deleteTask = async (taskId: number) => {
  const response = await axios.delete(`${BASE_URL}/task/${taskId}`);
  return response.data;
};