import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./contexts/UserContext";
import MyApp from "./components/MyApp";
import {theme} from "./theme";
import "@fontsource/pacifico";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <MyApp />
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
