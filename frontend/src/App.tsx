import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./contexts/UserContext";
import MyApp from "./components/MyApp";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <UserProvider>
        <MyApp />
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
