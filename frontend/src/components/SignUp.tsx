import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: any) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
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
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <Text>Email:</Text>
          <Input type="email" onChange={onChangeEmail} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <Text>Password:</Text>
          <Input type="password" onChange={onChangePassword} />
        </Box>
        <Button w="100%" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
