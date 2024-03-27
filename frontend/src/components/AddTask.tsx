import React, { useState } from "react";
import { Button, Input, useToast, Select } from "@chakra-ui/react";
import axios from "axios";

interface AddTaskProps {
  onTasksUpdated: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTasksUpdated }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [priority, setPriority] = useState(""); 
  const [isPriorityInvalid, setIsPriorityInvalid] = useState(false); 
  const toast = useToast();

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <form onSubmit={addTask}>
      <label htmlFor="new-task-title">New Task Title</label>
      <Input
        id="new-task-title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter a new task..."
        mb={4}
      />
      <Select
        value={priority}
        onChange={(e) => {
          setIsPriorityInvalid(false); 
          setPriority(e.target.value);
        }}
        placeholder="Select priority"
        mb={4}
        isInvalid={isPriorityInvalid} 
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>
      <Button type="submit" colorScheme="blue">
        Add Task
      </Button>
    </form>
  );
};

export default AddTask;
