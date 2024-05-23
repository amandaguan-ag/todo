import { Box, Text, Flex } from "@chakra-ui/react";
import { tagColors } from "../utils/tagColors"; 

export const Legend = () => {
  return (
    <Flex alignItems="center" justifyContent="center" my={4}>
      {Object.entries(tagColors).map(([tagName, color]) => (
        <Flex key={tagName} alignItems="center" mx={2}>
          <Box w="15px" h="15px" bg={color} mr={1} />
          <Text layerStyle="text">{tagName}</Text>
        </Flex>
      ))}
    </Flex>
  );
};