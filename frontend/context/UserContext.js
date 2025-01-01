"use client";

import { createContext, useState, useContext, useEffect } from "react";

// Create UserContext
const UserContext = createContext(null);

// UserProvider to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // Simulate fetching user data (replace with actual API call)
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/verify', {
            credentials: 'include',
          });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          setUser(null); // No user logged in
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
