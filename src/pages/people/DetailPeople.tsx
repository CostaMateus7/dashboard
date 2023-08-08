import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { peopleService } from '../../shared/service/api/people/peopleService';
import { DetailTools } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { VForm, VTextField } from '../../shared/forms';
import { useVForm } from '../../shared/forms/useVForm';
import { IVFormErrors } from '../../shared/forms/IVFormErrors';
import { AutoCompleteCities } from './components/AutoCompleteCities';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const validationFormSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
  nomeCompleto: yup.string().required().min(3),
});
export const DetailPeople = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      peopleService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setName(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: '',
      });
    }
  }, [id]);
  const handleSave = (data: IFormData) => {
    validationFormSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);
        if (id === 'nova') {
          peopleService.create(validatedData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              return;
            } else {
              if (isSaveAndClose()) {
                navigate(`/pessoas`);
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          peopleService
            .updateById(Number(id), { id: Number(id), ...validatedData })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
                return;
              } else {
                if (isSaveAndClose()) {
                  navigate(`/pessoas`);
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErros: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErros[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErros);
      });
  };
  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja deletar este campo?')) {
      peopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };
  return (
    <LayoutBasePage
      title={id === 'nova' ? 'Novo Usuário' : name}
      toolbar={
        <DetailTools
          textNewButton="Nova"
          showNewButton={id !== 'nova'}
          showSaveAndCloseButton
          showDeleteButton={id !== 'nova'}
          onClickSave={save}
          onClickSaveAndClose={saveAndClose}
          onClickBack={() => {
            navigate('/pessoas');
          }}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => {
            navigate('/pessoas/detalhe/nova');
          }}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          component={Paper}
          display="flex"
          flexDirection="column"
          variant="outlined"
        >
          <Grid container padding={2} spacing={2}>
            {isLoading && (
              <Grid item xs={12}>
                <LinearProgress />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  label="Nome Completo"
                  name="nomeCompleto"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="Email"
                  name="email"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <AutoCompleteCities isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
