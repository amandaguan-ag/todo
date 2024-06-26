import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import reportWebVitals from "./reportWebVitals";
import reportAccessibility from "./utils/reportAccessibility";
import { UserProvider } from "./contexts/UserContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Login />} />
                <Route path="log-in" element={<Login />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="home" element={<Home />} />
              </Route>
            </Routes>
          </UserProvider>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}

reportWebVitals();
reportAccessibility(React);
