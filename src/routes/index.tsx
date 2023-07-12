import { Button } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppDrawerContext, useAppThemeContext } from '../shared/context';

function AppRoutes() {
  // const { toogleTheme } = useAppThemeContext();
  const { toogleDrawer } = useAppDrawerContext();
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
