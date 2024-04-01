import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi"; 
import { sortTasks } from "./utils/taskUtils";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

const loadTasks = async () => {
  try {
    let fetchedTasks: Task[] = await fetchTasks();
    fetchedTasks = sortTasks(fetchedTasks); 
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
