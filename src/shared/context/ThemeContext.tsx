import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { LightTheme, DarkTheme } from '../../shared/themes';

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toogleTheme: () => void;
}

interface IChildrenReact {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const AppThemeProvider = ({ children }: IChildrenReact) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
  const toogleTheme = useCallback(() => {
    return setThemeName((oldThemeName) =>
      oldThemeName === 'dark' ? 'light' : 'dark',
    );
  }, []);

  const theme = useMemo(() => {
    if (themeName == 'light') return LightTheme;
    return DarkTheme;
  }, [themeName]);
  return (
    <ThemeContext.Provider value={{ themeName, toogleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>{' '}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};
