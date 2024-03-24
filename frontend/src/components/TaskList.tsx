import React, { useState, useEffect } from "react";
import { Box, List } from "@chakra-ui/react";
import axios from "axios";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:3005/tasks");
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const refreshTasks = async () => {
    const response = await axios.get("http://localhost:3005/tasks");
    setTasks(response.data);
  };

  return (
    <Box m={10}>
      <List spacing={3} mt="4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={refreshTasks} />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;