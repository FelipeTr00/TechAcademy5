import { createContext, useContext, useState } from "react";

interface AuthContexType {
  token: string | null;
  userId: string | null;
  userName: string | null;
  login: (
    token: string,
    userId: string,
    userName: string,
    rememberMe: boolean
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContexType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const getStoredItem = (key: string) =>
    localStorage.getItem(key) || sessionStorage.getItem(key);

  const [token, setToken] = useState<string | null>(() =>
    getStoredItem("authToken")
  );
  const [userId, setUserId] = useState<string | null>(() =>
    getStoredItem("userId")
  );
  const [userName, setUserName] = useState<string | null>(() =>
    getStoredItem("userName")
  );

  const login = (
    newToken: string,
    newUserId: string,
    newUserName: string,
    rememberMe: boolean
  ) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("authToken", newToken);
    storage.setItem("userId", newUserId);
    storage.setItem("userName", newUserName);

    setToken(newToken);
    setUserId(newUserId);
    setUserName(newUserName);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setToken(null);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userName,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return context;
};
