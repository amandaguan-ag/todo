import { Task } from "../types/Task";

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

export const sortTasks = (tasks: Task[]): Task[] => {
  return tasks.sort((a, b) => {
    return (
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
