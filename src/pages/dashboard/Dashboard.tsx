import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { citiesService } from '../../shared/service/api/cities/citiesService';
import { peopleService } from '../../shared/service/api/people/peopleService';

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [totalCountPeople, setTotalCountPeople] = useState(0);
  const [totalCountCities, setTotalCountCities] = useState(0);

  useEffect(() => {
    setIsLoadingCities(true);
    citiesService.getAll(1).then((result) => {
      setIsLoadingCities(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCities(result.totalCount);
      }
    });
  }, []);

  useEffect(() => {
    setIsLoadingPeople(true);
    peopleService.getAll(1).then((result) => {
      setIsLoadingPeople(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPeople(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBasePage
      toolbar={<Toolbar showNewButton={false} />}
      title="Página Inicial"
    >
      <Box display={'flex'} width="100%">
        <Grid container>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <CardContent>
                <Card>
                  <Typography variant="h5" textAlign="center" padding={4}>
                    Total de Pessoas
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={6}
                  >
                    {isLoadingPeople ? (
                      <Typography>Carregando...</Typography>
                    ) : (
                      <Typography variant="h1">{totalCountPeople}</Typography>
                    )}
                  </Box>
                </Card>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <CardContent>
                <Card>
                  <Typography variant="h5" textAlign="center" padding={4}>
                    Total de Cidades
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={6}
                  >
                    {isLoadingCities ? (
                      <Typography>Carregando...</Typography>
                    ) : (
                      <Typography variant="h1">{totalCountCities}</Typography>
                    )}
                  </Box>
                </Card>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
