import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../shared/components/login/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="pagina-inicial" element={<Login />} />
      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
