import React from "react";
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box m={10}>
        <VStack spacing={8}>
          <AddTask />
          <TaskList />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
