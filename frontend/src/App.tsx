import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Button, Box } from "@chakra-ui/react";
import axios, { AxiosResponse, AxiosError } from "axios";

function App() {
  const [firstName, setFirstName] = useState("Callie");
  const [lastName, setLastName] = useState("Stoscup");

  const onChangeFirstName = (event: any) => {
    setFirstName(event.target.value);
  };
  const onChangeLastName = (event: any) => {
    setLastName(event.target.value);
  };
  const onClick = async () => {
    const response = await axios.post("http://localhost:3005/name", {
      firstName,
      lastName,
    });
    console.log("RESPONSE: ", response.data);
  };
  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <input
          onChange={onChangeFirstName}
          placeholder="Type in a first name..."
        />
        <input
          onChange={onChangeLastName}
          placeholder="Type in a last name..."
        />
        <Button onClick={onClick} colorScheme="purple">
          Add
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
