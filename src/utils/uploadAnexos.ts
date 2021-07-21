import { AxiosInstance } from 'axios';

interface AnexoProps {
  anexoId: string;
  nome: string;
  mimeType: string;
}

export const uploadAnexo = async (api: AxiosInstance, file: File) => {
  const formData = new FormData();

  formData.append('anexo', file);

  const { data } = await api.post<AnexoProps>('/anexos', formData);

  return data;
};
