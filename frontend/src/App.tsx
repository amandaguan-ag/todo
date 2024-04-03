import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import Home from "./components/Home";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userDetailsEntered, setUserDetailsEntered] = useState(false);
  const [userName, setUserName] = useState("");
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

  const handleUserDetailsSubmit = () => {
    if (userName && userEmail) {
      setUserDetailsEntered(true);
    } else {
      alert("Please enter both your name and email.");
    }
  };

  if (!userDetailsEntered) {
    return (
      <ChakraProvider>
        <Box m={10} as="main">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Enter your name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
            <Button onClick={handleUserDetailsSubmit} colorScheme="blue">
              Enter App
            </Button>
          </VStack>
        </Box>
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
