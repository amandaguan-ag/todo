import React from "react";
import { ListItem } from "@chakra-ui/react";

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<TaskProps> = ({ task }) => {

  return (
    <ListItem>
      {task.title}
    </ListItem>
  );
};

export default TaskItem;
