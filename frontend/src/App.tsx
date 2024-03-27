import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([]); 

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRefreshTasks = () => {
    fetchTasks();
  };

  return (
    <ChakraProvider>
      <Box m={10}>
        <VStack spacing={8}>
          <AddTask onTasksUpdated={handleRefreshTasks} />
          <TaskList onTasksUpdated={handleRefreshTasks} tasks={tasks} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
