export interface Publication {
  anexos: string[];
  categoria: 'cachorro' | 'gato' | 'outros';
  createdAt: string;
  updatedAt: string;
  cor?: string;
  latitude: number;
  longitude: number;
  nome?: string;
  observacoes?: string;
  porte: 'pequeno' | 'medio' | 'grande';
  publicacaoId: string;
  sexo?: 'femea' | 'macho';
  situacao: 'desaparecido' | 'encontrado' | 'adocao';
  usuario: { nome: string; email: string };
}
