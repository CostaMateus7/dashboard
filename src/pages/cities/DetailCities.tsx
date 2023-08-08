import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { citiesService } from '../../shared/service/api/cities/citiesService';
import { DetailTools } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { VForm, VTextField } from '../../shared/forms';
import { useVForm } from '../../shared/forms/useVForm';
import { IVFormErrors } from '../../shared/forms/IVFormErrors';

interface IFormData {
  nome: string;
}

const validationFormSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});
export const DetailCity = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      citiesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/cidades');
        } else {
          setName(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);
  const handleSave = (data: IFormData) => {
    validationFormSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);
        if (id === 'nova') {
          console.log('teste');
          citiesService.create(validatedData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              return;
            } else {
              if (isSaveAndClose()) {
                navigate(`/cidades`);
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          citiesService
            .updateById(Number(id), { id: Number(id), ...validatedData })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
                return;
              } else {
                if (isSaveAndClose()) {
                  navigate(`/cidades`);
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
      citiesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/cidades');
        }
      });
    }
  };
  return (
    <LayoutBasePage
      title={id === 'nova' ? 'Nova Cidade' : name}
      toolbar={
        <DetailTools
          textNewButton="Nova"
          showNewButton={id !== 'nova'}
          showSaveAndCloseButton
          showDeleteButton={id !== 'nova'}
          onClickSave={save}
          onClickSaveAndClose={saveAndClose}
          onClickBack={() => {
            navigate('/cidades');
          }}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => {
            navigate('/cidades/detalhe/nova');
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
                  label="Nome"
                  name="nome"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
