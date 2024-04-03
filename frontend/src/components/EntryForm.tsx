import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  VStack,
  Heading,
  Text, 
} from "@chakra-ui/react";

interface EntryFormProps {
  onEnter: (name: string, email: string) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onEnter }) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (name && email) {
      onEnter(name, email);
    } else {
      toast({
        title: "Error",
        description: "Please enter both your name and email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m={10} as="main">
      <VStack spacing={4}>
        <Heading as="h1">Welcome to your todo list</Heading> 
        <Text>Please enter your details to continue.</Text>{" "}
        {/* Welcoming message */}
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit} color="#ffffff" bg="#316ECE">
          Enter App
        </Button>
      </VStack>
    </Box>
  );
};

export default EntryForm;
