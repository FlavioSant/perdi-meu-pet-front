import { Position } from '../@types/position';
import { FindPublicationData } from '../pages/findPublications';
import { NewPublicationData } from '../pages/newPublication';

import { removeKeys } from './removeKeys';

export const parseNewPublication = (
  newPublication: NewPublicationData,
  position: Position,
  anexosIds: string[] | undefined,
) => {
  let parsedNewPublication = {
    situacao: newPublication.situacao,
    categoria: newPublication.categoria,
    porte: newPublication.porte,
    sexo: newPublication.sexo,
    cor: newPublication.cor,
    nome: newPublication.nome,
    observacoes: newPublication.observacoes,
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
