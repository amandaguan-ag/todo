import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Button, Box } from "@chakra-ui/react";
import axios, { AxiosResponse, AxiosError } from "axios";

function App() {
  const [name, setName] = useState("test name 3");

  const onChange = (event: any) => {
    // console.log("EVENT:", event.target.value);
    setName(event.target.value);
  };

  const onClick = async () => {
    try {
      const response = await axios.post("http://localhost:3005/name", {
        name,
      });
      console.log("RESPONSE: ", response.data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <input onChange={onChange} placeholder="Type in a name..." />
        <Button onClick={onClick} colorScheme="purple">
          Test Connections!
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
