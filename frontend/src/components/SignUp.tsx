import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isInvalidEmail = (email: string) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (email.match(emailFormat) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

const isInvalidPass2 = (pass1: string, pass2: string) => {
  if (pass2 !== pass1) {
    return true;
  } else {
    return false;
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [submitClickEmail, setSubmitClickEmail] = useState(false);
  const [submitClickPassword, setSubmitClickPassword] = useState(false);
  const [submitClickSecondPassword, setSubmitClickSecondPassword] =
    useState(false);

  const isErrorEmail = isInvalidEmail(email) && submitClickEmail;
  const isErrorPassword = password === "" && submitClickPassword;
  const isErrorSecondPassword =
    isInvalidPass2(password, secondPassword) && submitClickSecondPassword;

  const onChangeEmail = (e: any) => {
    setSubmitClickEmail(false);
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setSubmitClickPassword(false);
    setPassword(e.target.value);
  };

  const onChangeSecondPassword = (e: any) => {
    setSubmitClickSecondPassword(false);
    setSecondPassword(e.target.value);
  };

  const onSubmit = () => {
    setSubmitClickEmail(true);
    setSubmitClickPassword(true);
    setSubmitClickSecondPassword(true);

    if (
      isInvalidEmail(email) ||
      password === "" ||
      secondPassword !== password ||
      secondPassword === ""
    ) {
      console.log("ERROR");
    } else {
      axios
        .post("http://localhost:3005/auth/sign-up", { email, password })
        .then((response) => {
          const token = response.data;
          localStorage.setItem("token", token);
          setEmail("");
          setPassword("");
          setSecondPassword("");
          setSubmitClickEmail(false);
          setSubmitClickPassword(false);
          setSubmitClickSecondPassword(false);

          navigate("/home");
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20}>
        Create an account
      </Text>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email ? email : ""}
            onChange={onChangeEmail}
          />
          {!isErrorEmail ? null : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password ? password : ""}
            onChange={onChangePassword}
          />
          {!isErrorPassword ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorSecondPassword} isRequired>
          <FormLabel>Enter Password Again</FormLabel>
          <Input
            type="password"
            value={secondPassword}
            onChange={onChangeSecondPassword}
          />
          {!isErrorSecondPassword ? null : (
            <FormErrorMessage>Password must match.</FormErrorMessage>
          )}
        </FormControl>
        <Button w="100%" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
