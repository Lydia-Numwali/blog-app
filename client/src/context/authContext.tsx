import {
  AuthContextProps,
  AuthContextProviderProps,
  AuthUserProps,
  Input,
} from "@/types/auth.types";
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUserProps | null>(
    JSON.parse(sessionStorage.getItem("user") || "null") || null
  );

  const login = async (input: Input) => {
    const res = await axios.post("http://localhost:5000/auth/login", input, {
      withCredentials: true,
    });
    setUser(res.data);
  };

  const logout = async () => {
    const res = await axios.post("http://localhost:5000/auth/logout", {}, {
      withCredentials: true,
    });
    setUser(null);
    console.log(res.data);
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, scrollToTop }}>
      {children}
    </AuthContext.Provider>
  );
};
