import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitClickEmail, setSubmitClickEmail] = useState(false);
  const [submitClickPassword, setSubmitClickPassword] = useState(false);

  const isErrorEmail = email === "" && submitClickEmail;
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
    if (email === "" || password === "") {
      console.log("ERROR");
    } else {
      axios
        .post("http://localhost:3005/auth/sign-up", { email, password })
        .then((response) => {
          console.log(response);
          setEmail("");
          setPassword("");
          setSubmitClickEmail(false);
          setSubmitClickPassword(false);
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
        <Button w="100%" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
