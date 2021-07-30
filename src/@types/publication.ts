export type Category = 'cachorro' | 'gato' | 'outros';

export type Size = 'pequeno' | 'medio' | 'grande';

export type Sex = 'femea' | 'macho' | 'outros';

export type Situation = 'desaparecido' | 'encontrado' | 'adocao';

export interface Publication {
  anexos?: string[];
  categoria: Category;
  createdAt: string;
  updatedAt: string;
  cor?: string;
  isResolvido: boolean;
  latitude: number;
  longitude: number;
  nome?: string;
  observacoes?: string;
  porte: Size;
  publicacaoId: string;
  sexo?: Sex;
  situacao: Situation;
  usuario: { nome: string; email: string };
}
