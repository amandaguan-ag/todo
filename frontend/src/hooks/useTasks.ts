import { useState, useEffect } from "react";
import { Task } from "../types/Task";
import { fetchTasks } from "../api/tasksApi";
import { sortTasks } from "../utils/taskUtils";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onTasksUpdated = async () => {
    try {
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to update tasks:", error);
      setError("Failed to update tasks");
    }
  };

  useEffect(() => {
    fetchTasks()
      .then((fetchedTasks) => {
        const sortedTasks = sortTasks(fetchedTasks);
        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setError("Failed to fetch tasks");
      });
  }, []);

  return { tasks, onTasksUpdated, error };
};

export default useTasks;
