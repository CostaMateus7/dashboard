import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListingPerson {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
export interface IDetailPerson {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
export type TPersonWithTotalCount = {
  data: IListingPerson[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
): Promise<TPersonWithTotalCount | Error> => {
  try {
    const relativeUrl = `/pessoas?_page=${page}&_limit=${Environment.LINE_LIMIT}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);
    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
      };
    }
    return new Error('Erro ao listar os registros');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros',
    );
  }
};
const getById = async (id: number): Promise<IDetailPerson | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);
    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o registro',
    );
  }
};
const create = async (
  dados: Omit<IDetailPerson, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailPerson>(`/pessoas`, dados);
    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro',
    );
  }
};
const updateById = async (
  id: number,
  dados: IDetailPerson,
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao deletar o registro',
    );
  }
};

export const peopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
