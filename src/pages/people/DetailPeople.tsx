import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { peopleService } from '../../shared/service/api/people/peopleService';
import { DetailTools } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetailPeople = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

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
    }
  }, [id]);
  const handleSave = (data: IFormData) => {
    setIsLoading(true);
    if (id === 'nova') {
      peopleService.create(data).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      peopleService
        .updateById(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            return;
          }
        });
    }
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
          onClickBack={() => {
            navigate('/pessoas');
          }}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => {
            navigate('/pessoas/detalhe/nova');
          }}
          onClickSave={() => formRef.current?.submitForm()}
          onClickSaveAndClose={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome Completo" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade" name="cidadeId" />
      </Form>
    </LayoutBasePage>
  );
};
