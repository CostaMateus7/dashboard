import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useAppDrawerContext } from '../shared/context';
import { DetailCity } from '../pages/cities/DetailCities';
import { ListingCities } from '../pages/cities/ListingCities';
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
        label: 'Pessoas',
        icon: 'people',
        path: '/pessoas',
      },
      {
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades',
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListingPeople />} />
      <Route path="/pessoas/detalhe/:id" element={<DetailPeople />} />

      <Route path="/cidades" element={<ListingCities />} />
      <Route path="/cidades/detalhe/:id" element={<DetailCity />} />

      <Route path="*" element={<Navigate to={'pagina-inicial'} />} />
    </Routes>
  );
}

export default AppRoutes;
