import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { citiesService } from '../../../shared/service/api/cities/citiesService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
  label: string;
  id: number;
};

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCities = ({
  isExternalLoading = false,
}: IAutoCompleteCityProps) => {
  const { fieldName, registerField, defaultValue, clearError, error } =
    useField('cidadeId');
  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue,
  );
  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { debounce } = useDebounce();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newValue) => setSelectedId(newValue),
    });
  }, [selectedId, fieldName, registerField]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      citiesService.getAll(1, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          // alert(result.message);
          return;
        }
        setOptions(
          result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome })),
        );
        console.log(result);
      });
    });
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      popupIcon={
        isLoading || isExternalLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      loading={isLoading}
      value={autoCompleteSelectedOption}
      disabled={isExternalLoading}
      onInputChange={(_, setValue) => setSearch(setValue)}
      onChange={(_, setValue) => {
        setSelectedId(setValue?.id);
        setSearch('');
        clearError();
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
