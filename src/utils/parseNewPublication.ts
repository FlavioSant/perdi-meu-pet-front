import { NewPublicationData } from '../pages/newPublication';
import { removeKeys } from './removeKeys';

interface Coords {
  lat: number;
  lng: number;
}

export const parseNewPublication = (
  newPublication: NewPublicationData,
  coords: Coords,
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
    latitude: coords.lat,
    longitude: coords.lng,
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
