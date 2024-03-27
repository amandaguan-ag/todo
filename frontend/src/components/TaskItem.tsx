import { Checkbox, ListItem, Button, Text, Grid } from "@chakra-ui/react";
import axios from "axios";
import { Task } from "../types/Task";

interface TaskProps {
  task: Task;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, onToggle }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

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
    <ListItem>
      <Grid
        templateColumns="repeat(3, 1fr) auto" 
        gap={4} 
        alignItems="center"
        py={2}
      >
        <Checkbox isChecked={task.completed} onChange={toggleCompletion}>
          {task.title}
        </Checkbox>
        <Text fontWeight="bold">{task.priority} Priority</Text>
        <Text color="gray.500">{formatDate(task.createdAt)}</Text>
        <Button
          colorScheme="red"
          size="sm"
          onClick={deleteTask}
          justifySelf="end" 
        >
          Delete
        </Button>
      </Grid>
    </ListItem>
  );
};

export default TaskItem;
