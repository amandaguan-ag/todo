import { useState } from "react";
import {
  Checkbox,
  ListItem,
  Button,
  Text,
  Grid,
  Box,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Task } from "../types/Task";

interface TaskProps {
  task: Task;
  onToggle: () => void;
  isHighlighted?: boolean;
}

const TaskItem: React.FC<TaskProps> = ({ task, onToggle, isHighlighted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleDescriptionSave = async () => {
    try {
      await axios.patch(`http://localhost:3005/task/${task.id}/description`, {
        description: editedDescription,
      });
      setIsEditing(false);
      onToggle(); // This should now trigger a refresh of the task list.
    } catch (error) {
      console.error("Failed to update task description:", error);
    }
  };

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
        templateColumns="repeat(3, 1fr) auto auto"
        gap={4}
        alignItems="center"
        py={2}
        bg={isHighlighted ? "yellow.100" : "white"}
        borderWidth={isHighlighted ? "2px" : "1px"}
        borderColor={isHighlighted ? "yellow.300" : "gray.200"}
      >
        {isEditing ? (
          <Input
            value={editedDescription}
            onChange={handleDescriptionChange}
            size="sm"
          />
        ) : (
          <Text>{task.description}</Text>
        )}
        <Text fontWeight="bold">{task.priority} Priority</Text>
        <Text color="#6B6666">{formatDate(task.createdAt)}</Text>
        <Button colorScheme="red" size="sm" onClick={deleteTask}>
          Delete
        </Button>
        {isEditing ? (
          <Button colorScheme="green" size="sm" onClick={handleDescriptionSave}>
            Save
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </Grid>
    </ListItem>
  );
};

export default TaskItem;
