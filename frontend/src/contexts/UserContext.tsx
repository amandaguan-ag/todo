import React, { createContext, useContext, useState, ReactNode } from "react";

// Define UserContextType only once
interface UserContextType {
  userEmail: string;
  setUserEmail: (email: string) => void;
}

// Create the context with a default value of undefined or appropriate default state
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
