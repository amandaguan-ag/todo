import { Box, List } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onTasksUpdated: () => void;
  isTodoSection: boolean; 
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTasksUpdated,
  isTodoSection,
}) => {
  return (
    <Box m={10}>
      <List spacing={3} mt="4">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onTasksUpdated}
            isHighlighted={isTodoSection && index === 0} 
          />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;