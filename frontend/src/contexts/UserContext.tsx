import { createContext, useContext, useState } from "react";

interface UserContextType {
  userEmail: string;
  setUserEmail: (email: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: React.ReactNode; 
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
