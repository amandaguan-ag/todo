import axios from "axios";

const BASE_URL = "http://localhost:3005";

interface TaskData {
  description: string;
  priority: string;
  tagNames?: string[];
  userEmail: string; 
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const makeApiRequest = async (
  endpoint: string,
  method: HttpMethod,
  payload: object | null = null
) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
      method,
      url,
      ...(payload && { data: payload }),
    };
    const response = await axios(options);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `API Error: ${error.response?.status} - ${error.response?.data}`
    );
  } else {
    console.error("Non-API error:", error);
  }
  throw error;
};

export const fetchTasks = (userEmail: string) =>
  makeApiRequest(`/tasks?userEmail=${encodeURIComponent(userEmail)}`, "GET");

export const addTask = (taskData: TaskData) =>
  makeApiRequest("/task", "POST", {
    ...taskData,
    tagNames: taskData.tagNames || [],
  });

export const updateTaskDescription = (taskId: number, description: string) =>
  makeApiRequest(`/task/${taskId}/description`, "PATCH", { description });

export const updateTask = (taskId: number, taskData: TaskData) =>
  makeApiRequest(`/task/${taskId}`, "PATCH", taskData);

export const toggleTaskCompletion = (taskId: number) =>
  makeApiRequest(`/task/${taskId}/completion`, "PATCH");

export const deleteTask = (taskId: number) =>
  makeApiRequest(`/task/${taskId}`, "DELETE");