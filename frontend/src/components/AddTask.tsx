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
  const [formState, setFormState] = useState({
    newTaskDescription: "",
    priority: "",
    tag: "",
    submitted: false,
  });
  const toast = useToast();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement; // Correctly typecasting the target
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, submitted: true }));

    const { newTaskDescription, priority, tag } = formState;
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
      setFormState({
        newTaskDescription: "",
        priority: "",
        tag: "",
        submitted: false,
      });
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

  const { newTaskDescription, priority, tag, submitted } = formState;

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
            name="newTaskDescription"
            value={newTaskDescription}
            onChange={handleInputChange}
            placeholder="Enter a new task..."
            size="md"
          />
          {submitted && !newTaskDescription.trim() && (
            <FormErrorMessage>Task description is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={submitted && !priority} flex={1}>
          <FormLabel htmlFor="task-priority">Priority*</FormLabel>
          <Select
            id="task-priority"
            name="priority"
            value={priority}
            onChange={handleInputChange}
            placeholder="Select priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          {submitted && !priority && (
            <FormErrorMessage>Priority selection is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl flex={1}>
          <FormLabel htmlFor="task-tag">Tag</FormLabel>
          <Select
            id="task-tag"
            name="tag"
            value={tag}
            onChange={handleInputChange}
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
