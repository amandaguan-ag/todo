import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Task } from "../types/Task";
import { fetchTasks } from "../api/tasksApi";
import { sortTasks } from "../utils/taskUtils";
import { useUser } from "../contexts/UserContext";

const MyApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { userEmail } = useUser(); 

  const onTasksUpdated = async () => {
    try {
      const updatedTasks = await fetchTasks(userEmail);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to update tasks:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {

      fetchTasks(userEmail)
        .then((fetchedTasks) => {
          const sortedTasks = sortTasks(fetchedTasks);
          setTasks(sortedTasks);
        })
        .catch((error) => {
          console.error("Failed to fetch tasks for user:", userEmail, error);
        });
    }
  }, [userEmail]);

  return (
    <Outlet
      context={{
        tasks,
        onTasksUpdated,
      }}
    />
  );
};

export default MyApp;
