import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Task } from "../types/Task";

interface OutletContext {
  userEmail: string;
  tasks: Task[];
  onLoginSuccess: (email: string) => void;
}

const isInvalidEmail = (email: string) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (email.match(emailFormat) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

const Login = () => {
  const { onLoginSuccess } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitClickEmail, setSubmitClickEmail] = useState(false);
  const [submitClickPassword, setSubmitClickPassword] = useState(false);
  const isErrorEmail = isInvalidEmail(email) && submitClickEmail;
  const isErrorPassword = password === "" && submitClickPassword;

  const onChangeEmail = (e: any) => {
    setSubmitClickEmail(false);
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setSubmitClickPassword(false);
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    setSubmitClickEmail(true);
    setSubmitClickPassword(true);

    if (isInvalidEmail(email) || password === "") {
      return;
    } else {
      axios
        .post("http://localhost:3005/auth/log-in", { email, password })
        .then((response) => {
          const token = response.data;
          localStorage.setItem("token", token);
          setEmail("");
          setPassword("");
          setSubmitClickEmail(false);
          setSubmitClickPassword(false);

          navigate("/home");
          toast({
            title: "Account created.",
            description: "Welcome back.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          onLoginSuccess(email);
        })
        .catch((error) => {
          console.log("Error: ", error);
          setEmail("");
          setPassword("");
          setSubmitClickEmail(false);
          setSubmitClickPassword(false);
        });
    }
  };

  return (
    <Box>
      <Heading textAlign="center" mb={4} fontSize={20} layerStyle="heading">
        Log into your account
      </Heading>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel layerStyle="text">Email</FormLabel>
          <Input
            type="email"
            value={email ? email : ""}
            onChange={onChangeEmail}
            layerStyle="text"
          />
          {!isErrorEmail ? null : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel layerStyle="text">Password</FormLabel>
          <Input
            type="password"
            value={password ? password : ""}
            onChange={onChangePassword}
            layerStyle="text"
          />
          {!isErrorPassword ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button w="100%" onClick={onSubmit}>
          Log In
        </Button>
        <Button
          w="100%"
          mt={4}
          colorScheme="blue"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
