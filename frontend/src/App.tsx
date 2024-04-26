import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import EntryForm from "./components/EntryForm";
import { Task } from "./types/Task";
import { fetchTasks } from "./api/tasksApi";
import { sortTasks } from "./utils/taskUtils";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 

const App: React.FC = () => {
  const [userDetailsEntered, setUserDetailsEntered] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
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
  }, []);

  const handleUserDetailsSubmit = (name: string, email: string) => {
    setUserEmail(email);
    setUserDetailsEntered(true);
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
        <Routes>
          <Route
            path="/"
            element={
              !userDetailsEntered ? (
                <EntryForm onEnter={handleUserDetailsSubmit} />
              ) : (
                <Box m={10}>
                  <Home
                    tasks={tasks}
                    userEmail={userEmail}
                    onTasksUpdated={handleTasksUpdated}
                  />
                </Box>
              )
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
