import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, removeData } from "@/utils/storage";
import { useRouter } from "expo-router";

interface AuthentificationContextType {
  userId: string | null;
  token: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthentificationContextType>({
  userId: null,
  token: null,
  logout: () => {},
});

export const AuthentificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getData<string>("token").then((token) => {
      if (!token) {
        setUserId(null);
        setToken(null);
        router.replace("/authorization/login");
        return;
      }
      try {
        const tokenId = token.split(".")[1];
        const payload = JSON.parse(atob(tokenId));
        if (!payload.exp || Date.now() / 1000 > payload.exp) {
          removeData("token");
          setUserId(null);
          setToken(null);
          router.replace("/authorization/login");
        } else {
          setUserId(payload.user_id);
          setToken(token);
        }
      } catch {
        removeData("token");
        setUserId(null);
        setToken(null);
        router.replace("/authorization/login");
      }
    });
  }, [router]);

  const logout = () => {
    removeData("token");
    setUserId(null);
    setToken(null);
    router.replace("/authorization/login");
  };

  return (
    <AuthContext.Provider value={{ userId, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
