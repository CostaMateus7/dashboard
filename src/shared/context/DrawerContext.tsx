import React, { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toogleDrawer: () => void;
}

interface IChildrenReact {
  children: React.ReactNode;
}

const drawerContext = createContext({} as IDrawerContextData);

export const AppDrawerProvider = ({ children }: IChildrenReact) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const toogleDrawer = useCallback(() => {
    return setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
  }, []);

  return (
    <drawerContext.Provider value={{ isDrawerOpen, toogleDrawer }}>
      {children}
    </drawerContext.Provider>
  );
};

export const useAppDrawerContext = () => {
  return useContext(drawerContext);
};
