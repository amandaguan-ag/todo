import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";
import { UserProvider } from "./contexts/UserContext";

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const handleUserDetailsSubmit = (email: string) => {
    setUserEmail(email);
  };

  return (
    <ChakraProvider>
      <UserProvider>
        <Outlet
          context={{
            userEmail,
            tasks,
            onLoginSuccess: handleUserDetailsSubmit,
          }}
        />
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
