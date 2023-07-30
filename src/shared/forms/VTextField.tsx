import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};
export const VTextField = ({ name, ...rest }: TVTextFieldProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [fieldName, registerField, value]);
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText={error}
      error={!!error}
      defaultValue={defaultValue}
      onKeyDown={() => (error ? clearError() : undefined)}
      {...rest}
    />
  );
};
