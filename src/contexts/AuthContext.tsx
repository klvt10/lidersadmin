import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { Api } from '@/services/Api';

export const PASSWORD_KEY = '5kZ/gYSWm25c+Gu78b0RI/C+KvWwdgH8+0Se47/ztK8=';

type User = {
  userId: string;
  appUser: string;
  profiledata: {
    name: string;
    document: string;
  };
};

type AuthenticationResponse = {
  authenticationToken: string;
  user: User;
};

type SignInCredentials = {
  login: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, 'lidersclubadmin.token');
  destroyCookie(undefined, 'lidersclubadmin.user');
  Router.push('/login');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    const {
      'lidersclubadmin.user': coockieUser,
    } = parseCookies();

    if (coockieUser) {
      setUser(JSON.parse(coockieUser));
    }

    setIsAuthenticated(!!coockieUser);
  }, []);

  async function signIn({ login, password }: SignInCredentials) {
    try {
      const encryptedPassword = CryptoJS.HmacSHA256(password, PASSWORD_KEY).toString(
        CryptoJS.enc.Base64,
      );

      const { data } = await Api.post<AuthenticationResponse>('AuthenticationAPI', {
        login: login,
        password: encryptedPassword,
        client: 'ADM',
      }, {
        headers: {
          'content-type': 'application/json',
          'ZUMO-API-VERSION': '2.0.0',
        },
      });

      if (data.authenticationToken) {
        setCookie(undefined, 'lidersclubadmin.token', data.authenticationToken, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        setCookie(undefined, 'lidersclubadmin.user', JSON.stringify(data.user), {
          maxAge: 60 * 60 * 24,
          path: '/',
        });

        Api.defaults.headers.Authorization = `Bearer ${data.authenticationToken}`;
        Api.defaults.headers['X-ZUMO-AUTH'] = data.authenticationToken;
        setUser(data.user);
        setIsAuthenticated(true);
        Router.push('/');
      } else {
        setIsAuthenticated(false);
        throw new Error();
      }
    } catch (error) {
      alert('Login falhou. Verifique seu login e senha.');
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
