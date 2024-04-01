import { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { Task } from "../types/Task";

const allTags = ["Work", "Study", "Personal"];

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdate: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onUpdate,
}) => {
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [tagNames, setTagNames] = useState<string[]>(
    task.tags.map((tag) => tag.name)
  );

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value as typeof priority);
  };

  const handleTagsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTagNames(selectedOptions);
  };

  const handleSave = async () => {
    try {
      const updateTaskDto = {
        description,
        priority,
        tagNames,
      };

      await axios.patch(`http://localhost:3005/task/${task.id}`, updateTaskDto);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="task-description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="task-priority" mt={4} isRequired>
            <FormLabel>Priority</FormLabel>
            <Select value={priority} onChange={handlePriorityChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </FormControl>
          <FormControl id="task-tags" mt={4}>
            <FormLabel>Tags</FormLabel>
            <Select multiple value={tagNames} onChange={handleTagsChange}>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
