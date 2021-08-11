import { Position } from '../@types/position';
import { FindPublicationData } from '../pages/findPublications';
import { CreatePublicationData } from '../pages/createPublication';

import { removeKeys } from '../utils/removeKeys';

export const parseNewPublication = (
  createPublicationData: CreatePublicationData,
  position: Position,
  anexosIds: string[] | undefined,
) => {
  let parsedNewPublication = {
    situacao: createPublicationData.situacao,
    categoria: createPublicationData.categoria,
    porte: createPublicationData.porte,
    sexo: createPublicationData.sexo,
    cor: createPublicationData.cor,
    nome: createPublicationData.nome,
    observacoes: createPublicationData.observacoes,
    latitude: position.lat,
    longitude: position.lng,
    anexos: anexosIds,
  };

  Object.keys(parsedNewPublication).forEach(value => {
    if (
      parsedNewPublication[value] === undefined ||
      parsedNewPublication[value] === ''
    ) {
      parsedNewPublication = removeKeys(parsedNewPublication, [value]);
    }
  });

  return parsedNewPublication;
};

export const parseFindPublications = (
  data: FindPublicationData,
  position: Position,
) => {
  let parsedFindPublication = {
    ...data,
    latitude: position.lat,
    longitude: position.lng,
  };

  Object.keys(parsedFindPublication).forEach(value => {
    if (
      parsedFindPublication[value] === undefined ||
      parsedFindPublication[value] === ''
    ) {
      parsedFindPublication = removeKeys(parsedFindPublication, [value]);
    }
  });

  return parsedFindPublication;
};
