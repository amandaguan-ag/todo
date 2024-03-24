import React, { useState } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";

const AddTask: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
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

    try {
      await axios.post("http://localhost:3005/task", {
        title: newTaskTitle.trim(),
      });
      setNewTaskTitle("");

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
      <Button type="submit" colorScheme="blue">
        Add Task
      </Button>
    </form>
  );
};

export default AddTask;
