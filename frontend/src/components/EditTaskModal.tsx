import { useReducer, ChangeEvent, useEffect } from "react";
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
import { updateTask } from "../api/tasksApi";
import { Task } from "../types/Task";

const allTags = ["Work", "Study", "Personal", "None"];

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdate: () => void;
}

type Action =
  | { type: "setDescription"; payload: string }
  | { type: "setPriority"; payload: Task["priority"] }
  | { type: "setTagNames"; payload: string[] };

function reducer(state: Task, action: Action): Task {
  switch (action.type) {
    case "setDescription":
      return { ...state, description: action.payload };
    case "setPriority":
      return { ...state, priority: action.payload };
    case "setTagNames":
      return {
        ...state,
        tags: action.payload.map((name) => ({ id: Math.random(), name })),
      }; 
    default:
      return state;
  }
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onUpdate,
}) => {
  const [state, dispatch] = useReducer(reducer, task);

  useEffect(() => {
    dispatch({ type: "setDescription", payload: task.description });
    dispatch({ type: "setPriority", payload: task.priority });
    dispatch({
      type: "setTagNames",
      payload: task.tags.map((tag) => tag.name),
    });
  }, [task]);

  const handleSave = async () => {
    try {
      await updateTask(task.id, {
        description: state.description,
        priority: state.priority,
        tagNames: state.tags.map((tag) => tag.name),
      });
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
              value={state.description}
              onChange={(e) =>
                dispatch({ type: "setDescription", payload: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="task-priority" mt={4} isRequired>
            <FormLabel>Priority</FormLabel>
            <Select
              value={state.priority}
              onChange={(e) =>
                dispatch({
                  type: "setPriority",
                  payload: e.target.value as Task["priority"],
                })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </FormControl>
          <FormControl id="task-tags" mt={4}>
            <FormLabel>Tags</FormLabel>
            <Select
              multiple
              value={state.tags.map((tag) => tag.name)}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                dispatch({ type: "setTagNames", payload: selectedOptions });
              }}
            >
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
