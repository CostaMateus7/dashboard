import { Route, Routes, Navigate } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path="pagina-inicial" />
      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
