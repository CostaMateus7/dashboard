import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/context';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

function AppRoutes() {
  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial',
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="pagina-inicial" element={<Dashboard />} />
      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
