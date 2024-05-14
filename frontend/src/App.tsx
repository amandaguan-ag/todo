import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";
import { UserProvider } from "./contexts/UserContext";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onTasksUpdated = async () => {
    try {
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to update tasks:", error);
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
      });
  }, []);

  return (
    <ChakraProvider>
      <UserProvider>
        <Outlet
          context={{
            tasks,
            onTasksUpdated,
          }}
        />
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
