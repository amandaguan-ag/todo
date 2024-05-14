import React from "react";
import { Checkbox, Stack } from "@chakra-ui/react";
import { TAGS } from "../constants/tags";

interface TagSelectorProps {
  selectedTags: string[];
  onTagChange: (tag: string, isChecked: boolean) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagChange,
}) => (
  <Stack direction="row">
    {TAGS.map((tag) => (
      <Checkbox
        key={tag}
        isChecked={selectedTags.includes(tag)}
        onChange={(e) => onTagChange(tag, e.target.checked)}
      >
        {tag}
      </Checkbox>
    ))}
  </Stack>
);

export default TagSelector;
