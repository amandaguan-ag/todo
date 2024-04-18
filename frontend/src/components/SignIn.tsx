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

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const toast = useToast();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signIn(email, password); 
        onSignIn(email, password); 
        navigate("/home"); 
      } catch (error) {
        toast({
          title: "Signin failed",
          description: "Invalid credentials. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter both your email and password.",
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
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="blue">
          Sign In
        </Button>
        <Text mt="4">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "blue.500" }}>
            Sign up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignIn;
