import React from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Badge,
  Container,
} from "@chakra-ui/react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import { Task } from "../types/Task";

interface HomeProps {
  tasks: Task[];
  onTasksUpdated: () => void;
}

const Home: React.FC<HomeProps> = ({ tasks, onTasksUpdated }) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const notCompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <VStack spacing={8} align="stretch">
      <AddTask onTasksUpdated={onTasksUpdated} />
      <Container
        centerContent
        p={4}
        bg="gray.100"
        borderRadius="md"
        boxShadow="xl"
        maxW="80%" 
        width="auto" 
      >
        <Text fontSize="md" fontWeight="bold">
          How Tasks Are Sorted:
        </Text>
        <Text fontSize="sm">
          Tasks are prioritized by{" "}
          <Badge colorScheme="purple">Priority Level</Badge> (High to Low), then
          by <Badge colorScheme="green">Creation Date</Badge> (Oldest to
          Newest).
        </Text>
      </Container>
      <Flex
        direction={{ base: "column", md: "row" }}
        width="full"
        justify="space-between"
      >
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          mb={4}
          flex="1"
          marginRight={2}
        >
          <Heading size="md" mb={4}>
            Todo
          </Heading>
          <TaskList onTasksUpdated={onTasksUpdated} tasks={notCompletedTasks} />
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          mb={4}
          flex="1"
          marginLeft={2}
        >
          <Heading size="md" mb={4}>
            Done
          </Heading>
          <TaskList onTasksUpdated={onTasksUpdated} tasks={completedTasks} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default Home;
