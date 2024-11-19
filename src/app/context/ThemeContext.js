"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  console.log(user);

  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser((prev) => ({ ...prev, ...savedUser }));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        user,
        setUser,
      }}
    >
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
