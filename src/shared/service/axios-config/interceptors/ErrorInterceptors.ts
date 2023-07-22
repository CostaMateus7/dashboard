import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network error') {
    return Promise.reject(new Error('Erro de Conexão!'));
  }
  if (error.response?.status === 401) {
    // Do Something
  }
  return Promise.reject(error);
};
