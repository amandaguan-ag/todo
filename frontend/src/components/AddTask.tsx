import React, { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";

const AddTask: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    console.log("Adding Task:", newTaskTitle);
    await axios.post("http://localhost:3005/task", { title: newTaskTitle });
    setNewTaskTitle(""); 
  };

  return (
    <>
      <Input
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter a new task..."
      />
      <Button onClick={addTask} colorScheme="blue">
        Add Task
      </Button>
    </>
  );
};

export default AddTask;
