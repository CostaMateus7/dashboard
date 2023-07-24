import { useSearchParams } from 'react-router-dom';
import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { useEffect, useMemo } from 'react';
import { peopleService } from '../../shared/service/api/people/peopleService';
import { useDebounce } from '../../shared/hooks';

export const ListingPeople = () => {
  const [searchParams, setSeachParams] = useSearchParams();
  const { debounce } = useDebounce();

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      peopleService.getAll(1, search).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);
      });
    });
  }, [search]);
  return (
    <LayoutBasePage
      title="Listagem de Pessoas"
      toolbar={
        <Toolbar
          textNewButton="Nova"
          showInputSearch
          searchText={search}
          changeTextSearch={(text) =>
            setSeachParams({ busca: text }, { replace: true })
          }
        />
      }
    >
      <div>oi</div>
    </LayoutBasePage>
  );
};
