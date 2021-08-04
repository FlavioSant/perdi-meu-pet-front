export const getOption = (value: string, items: any[]) => {
  const item = items.find(item => item.value === value);

  if (!item) {
    return '';
  }

  return item;
};

export const selectOptions = {
  category: [
    {
      label: 'Cachorro',
      value: 'cachorro',
    },
    {
      label: 'Gato',
      value: 'gato',
    },
    {
      label: 'Outros',
      value: 'outros',
    },
  ],
  size: [
    {
      label: 'Pequeno',
      value: 'pequeno',
    },
    {
      label: 'Médio',
      value: 'medio',
    },
    {
      label: 'Grande',
      value: 'grande',
    },
  ],
  sex: [
    {
      label: 'Fêmea',
      value: 'femea',
    },
    {
      label: 'Macho',
      value: 'macho',
    },
    {
      label: 'Outros',
      value: 'outros',
    },
  ],
  situation: [
    {
      label: 'Desaparecido',
      value: 'desaparecido',
    },
    {
      label: 'Encontrado',
      value: 'encontrado',
    },
    {
      label: 'Adoção',
      value: 'adocao',
    },
  ],
};

export const radioButtonOptions = [
  {
    id: 'desaparecido',
    label: 'Desaparecido',
    value: 'desaparecido',
    imageURL: '/sad-dog.svg',
  },
  {
    id: 'encontrado',
    label: 'Encontrado',
    value: 'encontrado',
    imageURL: 'happy-animals.svg',
  },
  {
    id: 'adocao',
    label: 'Adoção',
    value: 'adocao',
    imageURL: '/adoption.svg',
  },
];
