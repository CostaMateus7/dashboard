import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthService } from '../service/api/auth/AuthService';

const AuthContext = createContext({} as IAuthContextData);

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

interface IChildrenReact {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IChildrenReact) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        'APP_ACCESS_TOKEN',
        JSON.stringify(result.AccessToken),
      );
      setAccessToken(result.AccessToken);
    }
  }, []);
  const handleLogout = useCallback(() => {
    localStorage.removeItem('APP_ACCESS_TOKEN');
    setAccessToken(undefined);
  }, []);
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout: handleLogout, login: handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
