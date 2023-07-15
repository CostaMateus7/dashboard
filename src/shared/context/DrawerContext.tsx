import React, { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  toogleDrawer: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IChildrenReact {
  children: React.ReactNode;
}
interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

const drawerContext = createContext({} as IDrawerContextData);

export const AppDrawerProvider = ({ children }: IChildrenReact) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  const toogleDrawer = useCallback(() => {
    return setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
  }, []);
  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      return setDrawerOptions(newDrawerOptions);
    },
    [],
  );

  return (
    <drawerContext.Provider
      value={{
        isDrawerOpen,
        toogleDrawer,
        drawerOptions,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </drawerContext.Provider>
  );
};

export const useAppDrawerContext = () => {
  return useContext(drawerContext);
};
