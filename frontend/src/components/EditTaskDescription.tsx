import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { Task } from "../types/Task"; 
import { updateTaskDescription } from "../api/tasksApi";

interface EditTaskDescriptionProps {
  task: Task;
}

const EditTaskDescription: React.FC<EditTaskDescriptionProps> = ({ task }) => {
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDescription(event.target.value);
  };

  const handleDescriptionUpdate = async () => {
    try {
      await updateTaskDescription(task.id, newDescription);
    } catch (error) {
      console.error("Failed to update task description:", error);
    }
  };

  return (
    <div>
      <Input value={newDescription} onChange={handleDescriptionChange} />
      <Button onClick={handleDescriptionUpdate}>Update Description</Button>
    </div>
  );
};

export default EditTaskDescription; 
