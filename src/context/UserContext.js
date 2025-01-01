import { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Provider component to wrap the app
export const UserProvider = ({ children }) => {
  // Default user role (can be set dynamically later)
  const [user, setUser] = useState({ role: "user" }); // Default is 'user'

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use UserContext in components
export const useUser = () => {
  return useContext(UserContext);
};
