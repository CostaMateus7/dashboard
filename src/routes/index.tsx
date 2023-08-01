import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/context';
import { useEffect } from 'react';
import { Dashboard, DetailPeople, ListingPeople } from '../pages';

function AppRoutes() {
  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial',
      },
      {
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades',
      },
      {
        label: 'Pessoas',
        icon: 'people',
        path: '/pessoas',
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListingPeople />} />
      <Route path="/pessoas/detalhe/:id" element={<DetailPeople />} />

      <Route path="/cidades" element={<ListingPeople />} />
      <Route path="/cidades/detalhe/:id" element={<DetailPeople />} />

      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
