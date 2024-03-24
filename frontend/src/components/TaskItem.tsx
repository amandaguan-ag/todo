import React from "react";
import { Checkbox, ListItem } from "@chakra-ui/react";
import axios from "axios";

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggle: () => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, onToggle }) => {
  const toggleCompletion = async () => {
    try {
      await axios.patch(`http://localhost:3005/task/${task.id}/completion`);
      onToggle();
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  return (
    <ListItem textDecoration={task.completed ? "line-through" : "none"}>
      {task.title}
      <Checkbox isChecked={task.completed} onChange={toggleCompletion} ml="4" />
    </ListItem>
  );
};

export default TaskItem;
