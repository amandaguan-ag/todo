import { useState } from "react";
import {
  Button,
  Input,
  useToast,
  Select,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Heading, 
} from "@chakra-ui/react";
import axios from "axios";

interface AddTaskProps {
  onTasksUpdated: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTasksUpdated }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [isPriorityInvalid, setIsPriorityInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!newTaskTitle.trim()) {
      toast({
        title: "Please enter a task title.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!priority) {
      setIsPriorityInvalid(true);
      toast({
        title: "Priority selection is required.",
        description: "Please select a priority for the task.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post("http://localhost:3005/task", {
        title: newTaskTitle.trim(),
        priority,
      });
      setNewTaskTitle("");
      setPriority("");
      setIsPriorityInvalid(false);
      setSubmitted(false);

      toast({
        title: "Task added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred while adding the task.",
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    onTasksUpdated();
  };

  return (
    <VStack
      as="form"
      onSubmit={addTask}
      spacing={4}
      align="stretch"
      width="full"
    >
      <Heading size="lg" pb={4}>
        Add Task
      </Heading>{" "}
      <HStack spacing={4} align="flex-end">
        <FormControl isInvalid={submitted && !newTaskTitle.trim()} flex={2}>
          <FormLabel htmlFor="new-task-title">New Task Title</FormLabel>
          <Input
            id="new-task-title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter a new task..."
            size="md"
          />
          {submitted && !newTaskTitle.trim() && (
            <FormErrorMessage>Task title is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={submitted && isPriorityInvalid} flex={1}>
          <FormLabel htmlFor="task-priority">Priority</FormLabel>
          <Select
            id="task-priority"
            value={priority}
            onChange={(e) => {
              setIsPriorityInvalid(false);
              setPriority(e.target.value);
            }}
            placeholder="Select priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          {submitted && isPriorityInvalid && (
            <FormErrorMessage>Priority selection is required.</FormErrorMessage>
          )}
        </FormControl>
      </HStack>
      <Button type="submit" colorScheme="teal" size="lg" alignSelf="flex-end">
        Add Task
      </Button>
    </VStack>
  );
};

export default AddTask;
