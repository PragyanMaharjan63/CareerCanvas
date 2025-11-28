import axios from "axios";

import { createContext, useContext, useState, type ReactNode } from "react";

type userDetails = {
  _id: string;
  UserName: string;
  Email: string;
  ProfilePicture: string;
};

type backendType = {
  backendURL: string;
  checkAuth: () => Promise<void>;
  Loggedin: boolean;
  setLogin: (value: boolean) => void;
  user: userDetails | null;
  setUser: (value: userDetails | null) => void;
};

const backendContext = createContext<backendType>({
  backendURL: import.meta.env.VITE_BACKEND_URL,
  checkAuth: async () => {},
  Loggedin: false,
  setLogin: () => {},
  user: null,
  setUser: () => {},
});

export function BackendProvider({ children }: { children: ReactNode }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [Loggedin, setLogin] = useState(false);
  const [user, setUser] = useState<userDetails | null>(null);
  const checkAuth = async () => {
    try {
      const req = await axios.get(`${backendURL}/api/auth/me`, {
        withCredentials: true,
        validateStatus: () => true,
      });
      if (req.status === 200) {
        setLogin(true);
        setUser(req.data.user);
        return;
      }
      setLogin(false);
      setUser(null);
    } catch (err) {
      console.log("this is and error", err);
      setUser(null);
    }
  };

  const value: backendType = {
    backendURL,
    checkAuth,
    Loggedin,
    setLogin,
    user,
    setUser,
  };

  return (
    <backendContext.Provider value={value}>{children}</backendContext.Provider>
  );
}

export function useBackend() {
  return useContext(backendContext);
}
