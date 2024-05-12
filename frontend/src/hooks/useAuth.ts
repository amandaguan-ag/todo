import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../contexts/UserContext";

interface DecodedToken {
  email?: string;
}

const useAuth = () => {
  const navigate = useNavigate();
  const { setUserEmail } = useUser(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      if (decoded.email) {
        setUserEmail(decoded.email);
      } else {
        navigate("/log-in");
      }
    } else {
      navigate("/log-in");
    }
  }, [navigate, setUserEmail]); 
};

export default useAuth;
