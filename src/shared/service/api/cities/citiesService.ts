import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListingCity {
  id: number;
  nome: string;
}
export interface IDetailCity {
  id: number;
  nome: string;
}
export type TCityWithTotalCount = {
  data: IListingCity[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
): Promise<TCityWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cidade?_page=${page}&_limit=${Environment.LINE_LIMIT}&nome_like=${filter}`;
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
const getById = async (id: number): Promise<IDetailCity | Error> => {
  try {
    const { data } = await Api.get(`/cidade/${id}`);
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
  dados: Omit<IDetailCity, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailCity>(`/cidade`, dados);
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
  dados: IDetailCity,
): Promise<void | Error> => {
  try {
    await Api.put(`/cidade/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidade/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao deletar o registro',
    );
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
