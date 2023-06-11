import { Button } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="pagina-inicial"
        element={
          <Button variant="contained" color="primary">
            Cardápio Inteligente
          </Button>
        }
      />
      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
