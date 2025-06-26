import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("auth-token");
    const userData = localStorage.getItem("user-data");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        id: "1",
        name: "John Doe",
        email: email,
        phone: "+1234567890",
        fitnessGoals: ["Weight Loss", "Muscle Building"],
      };

      localStorage.setItem("auth-token", "dummy-token");
      localStorage.setItem("user-data", JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now().toString(),
        ...userData,
      };

      localStorage.setItem("auth-token", "dummy-token");
      localStorage.setItem("user-data", JSON.stringify(newUser));
      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-data");
    setUser(null);
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem("user-data", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
