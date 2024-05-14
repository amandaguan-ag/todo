import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App"
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="log-in" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="home" element={<Home />} />
    </Route>
  </Routes>
);

export default AppRoutes;
