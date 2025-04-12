import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = (email, password) => {
    localStorage.setItem("user", JSON.stringify({ email, password }));
    setUser({ email });
  };

  const login = (email, password) => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.email === email && stored.password === password) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
