import { Checkbox, ListItem, Button, Text, Grid, Box } from "@chakra-ui/react";
import axios from "axios";
import { Task } from "../types/Task";

interface TaskProps {
  task: Task;
  onToggle: () => void;
  isHighlighted?: boolean;
}

const TaskItem: React.FC<TaskProps> = ({ task, onToggle, isHighlighted }) => {
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
  type TagName = "Work" | "Study" | "Entertainment";

  const tagColors: Record<TagName, string> = {
    Work: "blue",
    Study: "green",
    Entertainment: "red",
  };
  function isTagName(tag: any): tag is TagName {
    return tag in tagColors;
  }
  const getTagColor = (tag?: string): string => {
    if (tag && isTagName(tag)) {
      return tagColors[tag];
    }
    return "gray"; 
  };

  return (
    <ListItem>
      <Box
        w="100%"
        h="10px"
        bg={task.tags?.length ? getTagColor(task.tags[0].name) : "gray"}
      />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr) auto",
          lg: "2fr 1fr 1fr auto",
        }}
        gap={4}
        alignItems="center"
        py={2}
        bg={isHighlighted ? "yellow.100" : "white"}
        borderWidth={isHighlighted ? "2px" : "1px"}
        borderColor={isHighlighted ? "yellow.300" : "gray.200"}
      >
        <Checkbox isChecked={task.completed} onChange={toggleCompletion}>
          {task.description}
        </Checkbox>
        <Text fontWeight="bold">{task.priority} Priority</Text>
        <Text color="#6B6666">{formatDate(task.createdAt)}</Text>
        <Button bg="#DB0A0A" size="sm" onClick={deleteTask} justifySelf="end">
          <Text color="white">Delete</Text>
        </Button>
      </Grid>
    </ListItem>
  );
};

export default TaskItem;
