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
import { Tag } from "../types/Tag";

const allTags = [
  { id: 1, name: "Work" },
  { id: 2, name: "Study" },
  { id: 3, name: "Personal" },
];

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdate: () => void;
}

type Action =
  | { type: "setDescription"; payload: string }
  | { type: "setPriority"; payload: Task["priority"] }
  | { type: "setTagIds"; payload: number[] };

function reducer(state: Task, action: Action): Task {
  switch (action.type) {
    case "setDescription":
      return { ...state, description: action.payload };
    case "setPriority":
      return { ...state, priority: action.payload };
    case "setTagIds":
      return {
        ...state,
        tags: action.payload
          .map((id) => allTags.find((tag) => tag.id === id))
          .filter((tag): tag is Tag => Boolean(tag)),
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
      type: "setTagIds",
      payload: task.tags.map((tag) => tag.id),
    });
  }, [task]);

  const handleSave = async () => {
    try {
      await updateTask(task.id, {
        description: state.description,
        priority: state.priority,
        tagNames: state.tags.map((tag) => tag.name),
        userEmail: task.userEmail, 
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="xl" boxShadow="dark-lg">
        <ModalHeader
          layerStyle="heading"
          bg="blue.500"
          color="white"
          borderTopRadius="xl"
        >
          Edit Task
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={6}>
          <FormControl id="task-description" isRequired>
            <FormLabel fontWeight="semibold" mb={1}>
              Description
            </FormLabel>
            <Input
              value={state.description}
              onChange={(e) =>
                dispatch({ type: "setDescription", payload: e.target.value })
              }
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl id="task-priority" mt={4} isRequired>
            <FormLabel fontWeight="semibold" mb={1}>
              Priority
            </FormLabel>
            <Select
              value={state.priority}
              onChange={(e) =>
                dispatch({
                  type: "setPriority",
                  payload: e.target.value as Task["priority"],
                })
              }
              focusBorderColor="blue.500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </FormControl>
          <FormControl id="task-tags" mt={4}>
            <FormLabel fontWeight="semibold" mb={1}>
              Tags
            </FormLabel>
            <Select
              multiple
              value={state.tags.map((tag) => tag.id.toString())}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => parseInt(option.value)
                );
                dispatch({ type: "setTagIds", payload: selectedOptions });
              }}
              focusBorderColor="blue.500"
            >
              {allTags.map((tag) => (
                <option key={tag.id} value={tag.id.toString()}>
                  {tag.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter bg="gray.100" borderBottomRadius="xl">
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
