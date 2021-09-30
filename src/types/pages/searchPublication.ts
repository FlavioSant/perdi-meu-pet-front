import { Category, Sex, Situation, Size } from '../publication';

export interface SearchPublicationData {
  categoria: Category;
  cor: string;
  nome?: string;
  porte: Size;
  sexo?: Sex;
  situacao: Situation;
}
