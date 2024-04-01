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
  Text,
} from "@chakra-ui/react";
import { addTask } from "../api/tasksApi";

interface AddTaskProps {
  onTasksUpdated: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTasksUpdated }) => {
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [isPriorityInvalid, setIsPriorityInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tag, setTag] = useState("");
  const toast = useToast();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!newTaskDescription.trim() || !priority) {
      toast({
        title: "Validation Error",
        description: "Please ensure all fields are filled out correctly.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await addTask({
        description: newTaskDescription.trim(),
        priority,
        tagNames: tag ? [tag] : [],
      });
      setNewTaskDescription("");
      setPriority("");
      setTag("");
      setIsPriorityInvalid(false);
      setSubmitted(false);
      toast({
        title: "Task added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onTasksUpdated();
    } catch (error) {
      console.error("An error occurred while adding the task:", error);
      toast({
        title: "An error occurred while adding the task.",
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleAddTask}
      spacing={4}
      align="stretch"
      width="full"
    >
      <Heading size="lg" pb={4}>
        Add Task
      </Heading>
      <HStack spacing={4} align="flex-end">
        <FormControl
          isInvalid={submitted && !newTaskDescription.trim()}
          flex={2}
        >
          <FormLabel htmlFor="new-task-description">
            New Task Description*
          </FormLabel>
          <Input
            id="new-task-description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter a new task..."
            size="md"
          />
          {submitted && !newTaskDescription.trim() && (
            <FormErrorMessage>Task description is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={submitted && isPriorityInvalid} flex={1}>
          <FormLabel htmlFor="task-priority">Priority*</FormLabel>
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
        <FormControl flex={1}>
          <FormLabel htmlFor="task-tag">Tag</FormLabel>
          <Select
            id="task-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Select tag"
          >
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </Select>
        </FormControl>
      </HStack>
      <Button type="submit" bg="#0A8080" size="lg" alignSelf="flex-end">
        <Text color="white">Add Task</Text>
      </Button>
    </VStack>
  );
};

export default AddTask;
