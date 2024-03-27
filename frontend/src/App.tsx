import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, VStack, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { Task } from "./types/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/tasks");
      const fetchedTasks: Task[] = response.data;

      fetchedTasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (a.completed !== b.completed) {
          return a.completed === false ? -1 : 1;
        } else {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      });

      setTasks(fetchedTasks);
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

  const completedTasks = tasks.filter((task) => task.completed);
  const notCompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <ChakraProvider>
      <Box m={10}>
        <VStack spacing={8}>
          <AddTask onTasksUpdated={handleRefreshTasks} />
          <Box textAlign="center" mb={6}>
            <Text fontSize="md" fontWeight="bold">
              How Tasks Are Sorted:
            </Text>
            <Text fontSize="sm">
              Tasks are prioritized by <strong>Priority Level</strong> (High to
              Low), then by <strong>Completion Status</strong> (Incomplete tasks
              first), and finally by <strong>Creation Date</strong> (Oldest to
              Newest).
            </Text>
          </Box>
          <Heading size="md" mb={4}>
            Not Completed Tasks
          </Heading>
          <TaskList
            onTasksUpdated={handleRefreshTasks}
            tasks={notCompletedTasks}
          />
          <Heading size="md" mb={4}>
            Completed Tasks
          </Heading>
          <TaskList
            onTasksUpdated={handleRefreshTasks}
            tasks={completedTasks}
          />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
