import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import AppRoutes from "./components/routes";
import reportWebVitals from "./reportWebVitals";
import reportAccessibility from "./utils/reportAccessibility";
import { UserProvider } from "./contexts/UserContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>,
    rootElement
  );
} else {
  console.error("Root element not found.");
}

reportWebVitals();
reportAccessibility(React);
