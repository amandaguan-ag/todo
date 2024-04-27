import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import EntryForm from "./components/EntryForm";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation

const App: React.FC = () => {
  const [userDetailsEntered, setUserDetailsEntered] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    fetchTasks()
      .then((fetchedTasks) => {
        const sortedTasks = sortTasks(fetchedTasks);
        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  }, []);

  const handleUserDetailsSubmit = (name: string, email: string) => {
    setUserEmail(email);
    setUserDetailsEntered(true);
  };

  // Check the pathname to decide what to render
  if (!userDetailsEntered && location.pathname === "/") {
    return (
      <ChakraProvider>
        <EntryForm onEnter={handleUserDetailsSubmit} />
      </ChakraProvider>
    );
  }

  // This allows child routes to be rendered
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
};

export default App;
