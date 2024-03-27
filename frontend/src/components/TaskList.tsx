import React from "react";
import { Box, List } from "@chakra-ui/react";
import axios from "axios";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTasksUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTasksUpdated }) => {

  return (
    <Box m={10}>
      <List spacing={3} mt="4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onTasksUpdated} />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;