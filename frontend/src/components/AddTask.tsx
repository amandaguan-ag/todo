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

const AddTask: React.FC<{ onTasksUpdated: () => void; userEmail: string }> = ({
  onTasksUpdated,
  userEmail,
}) => {
  const [formState, setFormState] = useState({
    description: "",
    priority: "",
    tagNames: [] as string[],
    userEmail,
    submitted: false,
  });

  const toast = useToast();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tagNames") {
      setFormState((prev) => ({ ...prev, tagNames: [value] }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, submitted: true }));

    if (!formState.description || !formState.priority) {
      toast({
        title: "Validation Error",
        description: "Please ensure all fields are filled out correctly.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      await addTask({
        description: formState.description,
        priority: formState.priority,
        tagNames: formState.tagNames,
        userEmail: formState.userEmail,
      });
      onTasksUpdated();
      setFormState({
        description: "",
        priority: "",
        tagNames: [],
        userEmail,
        submitted: false,
      });
      toast({
        title: "Task Added",
        description: "Your task has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error Adding Task",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <VStack spacing={4} align="stretch">
        <Heading size="lg" pb={4}>
          Add Task
        </Heading>
        <HStack spacing={4} align="flex-end">

          <FormControl
            isInvalid={formState.submitted && !formState.description.trim()}
            flex={2}
          >
            <FormLabel htmlFor="description">Task Description*</FormLabel>
            <Input
              id="description"
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              placeholder="Enter a new task..."
              size="md"
            />
            {formState.submitted && !formState.description.trim() && (
              <FormErrorMessage>Task description is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            isInvalid={formState.submitted && !formState.priority}
            flex={1}
          >
            <FormLabel htmlFor="priority">Priority*</FormLabel>
            <Select
              id="priority"
              name="priority"
              value={formState.priority}
              onChange={handleInputChange}
              placeholder="Select priority"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
            {formState.submitted && !formState.priority && (
              <FormErrorMessage>
                Priority selection is required.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl flex={1}>
            <FormLabel htmlFor="tag">Tag</FormLabel>
            <Select
              id="tag"
              name="tag"
              value={formState.tagNames[0] || ""} 
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
    </form>
  );
};

export default AddTask;
