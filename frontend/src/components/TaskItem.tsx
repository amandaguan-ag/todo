import React from "react";
import { Checkbox, ListItem, Button } from "@chakra-ui/react";
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

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3005/task/${task.id}`);
      onToggle(); 
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <ListItem display="flex" justifyContent="space-between" alignItems="center">
      <Checkbox isChecked={task.completed} onChange={toggleCompletion}>
        {task.title}
      </Checkbox>
      <Button colorScheme="red" size="sm" onClick={deleteTask}>
        Delete
      </Button>
    </ListItem>
  );
};

export default TaskItem;
