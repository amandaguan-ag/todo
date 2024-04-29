import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../contexts/UserContext";

const useAuth = () => {
  const navigate = useNavigate();
  const userContext = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<{ email?: string }>(token); // Correct decoding and checking for email
        if (decoded.email && userContext) {
          userContext.setUserEmail(decoded.email);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/log-in");
      }
    } else {
      navigate("/log-in");
    }
  }, [navigate, userContext]);
};

export default useAuth;
