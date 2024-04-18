import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";
import { Task } from "./types/Task";

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (userEmail) {
      const loadTasks = async () => {
        try {
          const fetchedTasks = await fetchTasks();
          const sortedTasks = sortTasks(fetchedTasks);
          setTasks(sortedTasks);
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      };

      loadTasks();
    }
  }, [userEmail]);

  const handleUserSignIn = async (email: string, password: string) => {
    console.log(email, password);

    if (email === "user@example.com" && password === "password") {
      setUserEmail(email);
    } 
  };

  const handleLogout = () => {
    setUserEmail(null); 
  };

  const handleTasksUpdated = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      const sortedTasks = sortTasks(fetchedTasks);
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Failed to fetch updated tasks:", error);
    }
  };

  return (
    <ChakraProvider>
      <Router>
        <Box m={10}>
          <Routes>
            <Route
              path="/signin"
              element={
                <SignIn onSignIn={(email, password) => setUserEmail(email)} />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  onSignUp={(email, password) => console.log(email, password)}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  tasks={tasks}
                  userEmail={userEmail || ""}
                  onTasksUpdated={handleTasksUpdated}
                />
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={userEmail ? "/home" : "/signin"} replace />
              }
            />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
