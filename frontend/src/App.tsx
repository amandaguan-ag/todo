import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Button } from "@chakra-ui/react";
import axios, { AxiosResponse, AxiosError } from "axios";

const sendTodo = () => {
  axios
    .post("http://localhost:3000/todos", {
      title: "New Todo",
      description: "A hardcoded Todo item.",
    })
    .then((response: AxiosResponse<any>) => console.log(response))
    .catch((error: AxiosError) => console.error(error));
};

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Button onClick={sendTodo}>Add Todo</Button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
