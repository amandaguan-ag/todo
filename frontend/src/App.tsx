import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import useTasks from "./hooks/useTasks";

const App: React.FC = () => {
  const { tasks, onTasksUpdated, error } = useTasks();

  return (
    <ChakraProvider>
      <UserProvider>
        <Outlet
          context={{
            tasks,
            onTasksUpdated,
          }}
        />
        {error && <div>{error}</div>}
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
