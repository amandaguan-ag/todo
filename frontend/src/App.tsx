import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
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

  const routes: RouteObject[] = [
    {
      path: "/signin",
      element: <SignIn onSignIn={(email, password) => setUserEmail(email)} />,
    },
    {
      path: "/signup",
      element: (
        <SignUp onSignUp={(email, password) => console.log(email, password)} />
      ),
    },
    {
      path: "/home",
      element: (
        <Home
          tasks={tasks}
          userEmail={userEmail || ""}
          onTasksUpdated={() => {}}
        />
      ),
    },
    {
      path: "*",
      element: <Navigate to={userEmail ? "/home" : "/signin"} replace />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
      <Box m={10}>
      </Box>
    </ChakraProvider>
  );
};

export default App;
