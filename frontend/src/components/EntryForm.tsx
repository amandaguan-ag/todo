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
import { registerUser } from "../api/tasksApi"; 
import axios from "axios";

interface EntryFormProps {
  onEnter: (name: string, email: string) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onEnter }) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (name && email) {
      try {
        await registerUser({ name, email });
        toast({
          title: "Registration Successful",
          description: "You have been successfully registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onEnter(name, email);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message || error.message;
          toast({
            title: "Registration Failed",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Registration Failed",
            description: "An unexpected error occurred.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
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
