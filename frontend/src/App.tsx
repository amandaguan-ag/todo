import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/tasks");
      const fetchedTasks: Task[] = response.data; 

      const sortedTasks = fetchedTasks.sort((a: Task, b: Task) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      setTasks(sortedTasks);
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
