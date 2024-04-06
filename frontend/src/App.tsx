import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import EntryForm from "./components/EntryForm";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userDetailsEntered, setUserDetailsEntered] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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

  const handleUserDetailsSubmit = (name: string, email: string) => {
    setUserEmail(email);
    setUserDetailsEntered(true);
  };

  if (!userDetailsEntered) {
    return (
      <ChakraProvider>
        <EntryForm onEnter={handleUserDetailsSubmit} />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Box m={10} as="main">
        <Home
          tasks={tasks}
          onTasksUpdated={handleRefreshTasks}
          userEmail={userEmail}
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
