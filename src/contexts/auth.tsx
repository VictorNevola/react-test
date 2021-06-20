import React, { createContext, useState, useEffect, useContext } from 'react';
import { setCookie, captureCookie } from '@resources/cookies'
import { api } from "@services/api";
import { autenticateUser, userLogged } from "@repositories/user";
import { DataPayloadAutenticateUSer, IautenticateUser } from '@repositories/user/types';
import { AxiosResponse } from 'axios';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  isLoading: boolean;
  Login(user: object): Promise<AxiosResponse<IautenticateUser> | undefined>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storagedUser = captureCookie(process.env.IMEALS_USER_LOGGED);
    const storagedToken = captureCookie(process.env.IMEALS_AUTH_COOKIE);

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }

    setIsLoading(false);

  }, []);

  async function Login(userData: DataPayloadAutenticateUSer) {
    const isAuthenticate = await autenticateUser(userData);

    if(isAuthenticate) {
      setCookie(process.env.IMEALS_AUTH_COOKIE || "IMEALS", isAuthenticate.data.token.value, isAuthenticate.data.token.expireTime);
      const user = await userLogged();

      if(user) {
        setCookie(process.env.IMEALS_USER_LOGGED || "IMEALS__USER", JSON.stringify(user.data[0]), isAuthenticate.data.token.expireTime);
        setUser(user.data[0]);
      }
    }

    return isAuthenticate;
  }
  
  function Logout() {
    setUser(null);
    setCookie(process.env.IMEALS_AUTH_COOKIE || "IMEALS", '', '-99999999');
    setCookie(process.env.IMEALS_USER_LOGGED || "IMEALS__USER", '', '-99999999');
  }

  return (
    <AuthContext.Provider
      value={{ 
        signed: Boolean(user), 
        user, 
        Login, 
        Logout, 
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}