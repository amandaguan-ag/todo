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
  userEmail: string;
}

const AddTask: React.FC<AddTaskProps> = ({ onTasksUpdated, userEmail }) => {
  const [formState, setFormState] = useState({
    newTaskDescription: "",
    priority: "",
    tag: "",
    isRecurring: false,
    recurringInterval: "",
    submitted: false,
  });
  const toast = useToast();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement; 
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormState((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, submitted: true }));

    const {
      newTaskDescription,
      priority,
      tag,
      isRecurring,
      recurringInterval,
    } = formState;

    const tagNames = tag ? [tag] : [];

    if (!newTaskDescription.trim() || !priority) {
      toast({
        title: "Validation Error",
        description:
          "Please ensure all required fields are filled out correctly.",
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
        tagNames,
        userEmail,
        isRecurring,
        recurringInterval: isRecurring ? recurringInterval : undefined,
      });

      setFormState({
        newTaskDescription: "",
        priority: "",
        tag: "",
        isRecurring: false,
        recurringInterval: "",
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

  const {
    newTaskDescription,
    priority,
    tag,
    isRecurring,
    recurringInterval,
    submitted,
  } = formState;

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
          isRequired
        >
          <FormLabel htmlFor="new-task-description">
            New Task Description
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
        <FormControl isInvalid={submitted && !priority} flex={1} isRequired>
          <FormLabel htmlFor="task-priority">Priority</FormLabel>
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
      <HStack spacing={4} align="flex-end">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="is-recurring" mb="0">
            Recurring
          </FormLabel>
          <input
            id="is-recurring"
            name="isRecurring"
            type="checkbox"
            checked={isRecurring}
            onChange={handleInputChange}
          />
        </FormControl>
        {isRecurring && (
          <FormControl
            isInvalid={submitted && isRecurring && !recurringInterval}
          >
            <FormLabel htmlFor="recurring-interval">Interval</FormLabel>
            <Select
              id="recurring-interval"
              name="recurringInterval"
              value={recurringInterval}
              onChange={handleInputChange}
              placeholder="Select interval"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
              <option value="Monthly">Monthly</option>
            </Select>
            {submitted && isRecurring && !recurringInterval && (
              <FormErrorMessage>
                Recurring interval is required.
              </FormErrorMessage>
            )}
          </FormControl>
        )}
      </HStack>
      <Button type="submit" bg="#0A8080" size="lg" alignSelf="flex-end">
        <Text color="white">Add Task</Text>
      </Button>
    </VStack>
  );
};

export default AddTask;
