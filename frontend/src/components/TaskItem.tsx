import { useState } from "react";
import {
  Checkbox,
  ListItem,
  Button,
  Text,
  Grid,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Task } from "../types/Task";
import EditTaskModal from "./EditTaskModal";
import { toggleTaskCompletion, deleteTask } from "../api/tasksApi"; 

interface TaskProps {
  task: Task;
  onToggle: () => void;
  isHighlighted?: boolean;
}

const TaskItem: React.FC<TaskProps> = ({ task, onToggle, isHighlighted }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleUpdateTask = () => {
    onToggle();
    setIsEditModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const toggleCompletion = async () => {
    try {
      await toggleTaskCompletion(task.id);
      onToggle();
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.id);
      onToggle(); 
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  type TagName = "Work" | "Study" | "Personal";
  const tagColors: Record<TagName, string> = {
    Work: "blue",
    Study: "green",
    Personal: "red",
  };

  function isTagName(tag: any): tag is TagName {
    return tag in tagColors;
  }

  const getTagColor = (tag?: string): string => {
    if (tag && isTagName(tag)) {
      return tagColors[tag];
    }
    return "transparent";
  };

  const baseLayout = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={task}
        onUpdate={handleUpdateTask}
      />
      <ListItem>
        <Box
          w="100%"
          h="10px"
          bg={
            task.tags?.length ? getTagColor(task.tags[0].name) : "transparent"
          }
        />
        <Grid
          templateColumns={baseLayout ? "1fr" : "repeat(3, 1fr) auto auto"}
          templateRows={baseLayout ? "auto auto auto" : "auto"}
          templateAreas={{
            base: `"checkbox"
                   "description"
                   "priority"
                   "date"
                   "edit-delete"`,
            md: `"checkbox description priority date edit-delete"`,
          }}
          gap={4}
          alignItems="center"
          py={2}
          bg={isHighlighted ? "yellow.100" : "white"}
          borderWidth={isHighlighted ? "2px" : "1px"}
          borderColor={isHighlighted ? "yellow.300" : "gray.200"}
        >
          <Checkbox
            isChecked={task.completed}
            onChange={toggleCompletion}
            gridArea="checkbox"
          >
            <Text fontWeight="bold" gridArea="description">
              {task.description}
            </Text>
          </Checkbox>
          <Text fontWeight="bold" gridArea="priority">
            {task.priority} Priority
          </Text>
          <Text color="#6B6666" gridArea="date">
            {formatDate(task.createdAt)}
          </Text>
          <Box
            gridArea="edit-delete"
            display="flex"
            justifyContent="end"
            mt={baseLayout ? 2 : 0}
          >
            <Button
              bg="#C83E3E"
              color="white"
              size="sm"
              onClick={handleDeleteTask}
              mr={2}
            >
              Delete
            </Button>
            <Button size="sm" onClick={handleOpenEditModal}>
              Edit
            </Button>
          </Box>
        </Grid>
      </ListItem>
    </>
  );
};

export default TaskItem;
