import { useEffect, useMemo, useState } from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  IListingPerson,
  peopleService,
} from '../../shared/service/api/people/peopleService';
import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';

export const ListingPeople = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<IListingPerson[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const pages = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      peopleService.getAll(pages, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setRows(result.data);
        setTotalCount(result.totalCount);
        console.log(result);
      });
    });
  }, [search, pages]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja deletar este campo?')) {
      peopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id != id),
          ]);
          alert('Registro apagado com sucesso!');
        }
      });
    }
  };
  return (
    <LayoutBasePage
      title="Listagem de Pessoas"
      toolbar={
        <Toolbar
          textNewButton="Nova"
          showInputSearch
          searchText={search}
          changeTextSearch={(text) =>
            setSeachParams({ search: text, page: '1' }, { replace: true })
          }
          clickInNew={() => navigate(`/pessoas/detalhe/nova`)}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ width: 'auto', m: 1 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LINE_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
                    page={pages}
                    onChange={(_, newPage) =>
                      setSeachParams(
                        { search: search, page: newPage.toString() },
                        { replace: true },
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
