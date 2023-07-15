import { Button } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/context';
import { useEffect } from 'react';

function AppRoutes() {
  const { toogleDrawer, setDrawerOptions } = useAppDrawerContext();

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
      <Route
        path="pagina-inicial"
        element={
          <Button variant="contained" onClick={toogleDrawer}>
            Teste
          </Button>
        }
      />
      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
