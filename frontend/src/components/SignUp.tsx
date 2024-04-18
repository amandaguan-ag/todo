import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { signIn, signUp } from "../api/tasksApi";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  onSignUp: (email: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const toast = useToast();
  const navigate = useNavigate(); // Add this line
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        console.log("Signing up with:", email, password);
        const response = await signUp(email, password);
        onSignUp(email, password); 
        console.log(response); 
        navigate("/home"); 
      } catch (error) {
        toast({
          title: "Signup failed",
          description: "An error occurred during signup. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m={10} as="main">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="blue">
          Sign Up
        </Button>
        <Text mt="4">
          Already have an account?{" "}
          <Link to="/signin" style={{ color: "blue.500" }}>
            Sign in
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignUp;
