import React, { useState } from "react";
import { Checkbox, Stack } from "@chakra-ui/react";

interface TaskFilteringComponentProps {
  availableTags: string[]; // Available tags for filtering
  onTagSelectionChange: (selectedTags: string[]) => void; // Function to call when tag selection changes
}

const TaskFilteringComponent: React.FC<TaskFilteringComponentProps> = ({
  availableTags,
  onTagSelectionChange,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string, isChecked: boolean) => {
    const newSelectedTags = isChecked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setSelectedTags(newSelectedTags);
    onTagSelectionChange(newSelectedTags);
  };

  return (
    <Stack direction="row" wrap="wrap" spacing={2}>
      {availableTags.map((tag) => (
        <Checkbox
          key={tag}
          isChecked={selectedTags.includes(tag)}
          onChange={(e) => handleTagChange(tag, e.target.checked)}
        >
          {tag}
        </Checkbox>
      ))}
    </Stack>
  );
};

export default TaskFilteringComponent;
