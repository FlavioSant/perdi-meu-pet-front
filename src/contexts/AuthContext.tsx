import { createContext, useCallback, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/api';
import { useEffect } from 'react';

interface User {
  nome: string;
  email: string;
}

interface SignInData {
  email: string;
  senha: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  console.log('USER', user);

  useEffect(() => {
    const { 'perdi-meu-pet': token } = parseCookies();

    if (token) {
      const parsedToken = token.split('.')[1];
      setUser(JSON.parse(atob(parsedToken)));
    }
  }, []);

  const signIn = useCallback(async ({ email, senha }: SignInData) => {
    const {
      data: { token, usuario },
    } = await api.post('sign-in', {
      email,
      senha,
    });

    setCookie(undefined, 'perdi-meu-pet', token, {
      maxAge: 60 * 60 * 24, // 24 hours
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(usuario);

    Router.push('/');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
