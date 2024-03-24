import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Button,
  Box,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:3005/tasks");
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    console.log("Adding Task:", newTaskTitle);
    const response = await axios.post("http://localhost:3005/task", {
      title: newTaskTitle,
    });
    //   await axios.post("http://localhost:3005/task", { title: newTaskTitle });
    console.log("Add Task Response:", response.data);
    // Clear input after adding and possibly fetch updated list
  };

  return (
    <ChakraProvider>
      <Box m={10}>
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task..."
        />
        <Button onClick={addTask} colorScheme="blue" mt="4">
          Add Task
        </Button>
        <List spacing={3} mt="4">
          {tasks.map((task) => (
            <ListItem key={task.id}>{task.title}</ListItem>
          ))}
        </List>
      </Box>
    </ChakraProvider>
  );
}

export default App;
