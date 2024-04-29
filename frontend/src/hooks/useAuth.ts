import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (): void => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/log-in");
    }
  }, [navigate]);
};

export default useAuth;