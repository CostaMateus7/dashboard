import { Route, Routes, Navigate } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="pagina-inicial"
        element={<h1>Página Inicial - Comanda Inteligente</h1>}
      />
      <Route path="*" element={<Navigate to={"pagina-inicial"} />} />
    </Routes>
  );
}

export default AppRoutes;
