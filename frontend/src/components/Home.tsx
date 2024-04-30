import { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Badge,
  Container,
  Stack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import { Task } from "../types/Task";
import { Legend } from "./Legend";
import { useNavigate, useOutletContext } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../contexts/UserContext";
import { useUser } from "../contexts/UserContext";

interface HomeProps {
  tasks: Task[];
  onTasksUpdated: () => void;
}

const Home: React.FC = () => {
  const { tasks, onTasksUpdated } = useOutletContext<{
    tasks: Task[];
    onTasksUpdated: () => void;
  }>();
  const userContext = useUser(); // Using the custom hook for context
  useAuth();
  console.log("Logged-in user email:", userContext?.userEmail);
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredCompletedTasks, setFilteredCompletedTasks] = useState<Task[]>(
    []
  );
  const [filteredNotCompletedTasks, setFilteredNotCompletedTasks] = useState<
    Task[]
  >([]);

  useEffect(() => {
    const filterTasksByTags = (taskList: Task[]) => {
      return selectedTags.length > 0
        ? taskList.filter((task) =>
            task.tags.some((tag) => selectedTags.includes(tag.name))
          )
        : taskList;
    };

    setFilteredCompletedTasks(
      filterTasksByTags(tasks.filter((task) => task.completed))
    );
    setFilteredNotCompletedTasks(
      filterTasksByTags(tasks.filter((task) => !task.completed))
    );
  }, [tasks, selectedTags]);

  const handleTagChange = (tag: string, isChecked: boolean) => {
    setSelectedTags((prev) =>
      isChecked ? [...prev, tag] : prev.filter((t) => t !== tag)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/log-in");
  };

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="xl" textAlign="center" my={6}>
        Task Manager
      </Heading>
      <Button onClick={handleLogout}>Logout</Button>
      <AddTask
        onTasksUpdated={onTasksUpdated}
        userEmail={userContext?.userEmail ?? ""}
      />
      <Container
        centerContent
        p={4}
        bg="gray.100"
        borderRadius="md"
        boxShadow="xl"
      >
        <Text fontSize="md" fontWeight="bold">
          How Tasks Are Sorted:
        </Text>
        <Text fontSize="sm">
          Tasks are prioritized by
          <Badge colorScheme="purple">Priority Level</Badge> (High to Low), then
          by <Badge colorScheme="green">Creation Date</Badge> (Oldest to
          Newest).
        </Text>
      </Container>
      <Legend />
      <Stack direction="row">
        {["Work", "Study", "Personal"].map((tag) => (
          <Checkbox
            key={tag}
            isChecked={selectedTags.includes(tag)}
            onChange={(e) => handleTagChange(tag, e.target.checked)}
          >
            {tag}
          </Checkbox>
        ))}
      </Stack>
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
          <TaskList
            tasks={filteredNotCompletedTasks}
            onTasksUpdated={onTasksUpdated}
            isTodoSection={true}
          />
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
          <TaskList
            tasks={filteredCompletedTasks}
            onTasksUpdated={onTasksUpdated}
            isTodoSection={false}
          />
        </Box>
      </Flex>
    </VStack>
  );
};

export default Home;
