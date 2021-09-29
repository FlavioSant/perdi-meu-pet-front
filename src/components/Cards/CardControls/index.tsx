import { FiCheck, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Button } from '../../Forms/Button';

import { ControlsContainer } from './styles';

interface CardControlsProps {
  situation: 'encontrado' | 'desaparecido' | 'adocao';
  onResolve: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const CardControls: React.FC<CardControlsProps> = ({
  situation,
  onDelete,
  onEdit,
  onResolve,
}) => (
  <ControlsContainer>
    <Button
      type="button"
      background="green"
      onClick={onResolve}
      title={`Marcar Como ${
        situation === 'desaparecido'
          ? 'Encontrado'
          : situation === 'adocao'
          ? 'Adotado'
          : 'Resgatado'
      }`}
    >
      <FiCheck size={18} />
      {situation === 'encontrado'
        ? 'Animal Resgatado'
        : situation === 'desaparecido'
        ? 'Animal Encontrado'
        : 'Animal Adotado'}
    </Button>

    <Button
      type="button"
      background="blue"
      title="Editar Publicação"
      onClick={onEdit}
    >
      <FiEdit3 size={18} />
      Editar Publicação
    </Button>

    <Button
      type="button"
      background="red"
      title="Excluir Publicação"
      onClick={onDelete}
    >
      <FiTrash2 size={18} />
      Excluir Publicação
    </Button>
  </ControlsContainer>
);
