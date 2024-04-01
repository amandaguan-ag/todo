import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi"; 

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const fetchedTasks: Task[] = await fetchTasks();
      fetchedTasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return (
          priorityOrder[a.priority] - priorityOrder[b.priority] ||
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleRefreshTasks = () => {
    loadTasks();
  };

  return (
    <ChakraProvider>
      <Box m={10} as="main">
        <Home tasks={tasks} onTasksUpdated={handleRefreshTasks} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
