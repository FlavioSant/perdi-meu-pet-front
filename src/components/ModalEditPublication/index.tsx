import Modal from 'react-modal';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiCheck, FiX } from 'react-icons/fi';
import * as Yup from 'yup';

import { Publication } from '../../@types/publication';
import {
  getOption,
  radioButtonOptions,
  selectOptions,
} from '../../utils/inputsOptions';
import { handleErrors } from '../../functions/handleErrors';
import { successToast, warnToast } from '../../utils/toast';
import { removeKeys } from '../../utils/removeKeys';
import { getAPIClient } from '../../services/apiClient';

import { Button } from '../Button';
import { ImageRadioButton } from '../ImageRadioButton';
import { FlexItems } from '../FlexItems';
import { Select } from '../Select';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

import { FormButtons } from './styles';

interface UpdatePublicationData {
  categoria: string;
  cor: string;
  nome: string;
  observacoes: string;
  porte: string;
  sexo: string;
  situacao: string;
}

interface ModalEditPublicationProps {
  isOpen: boolean;
  publication: Publication | null;
  onRequestClose: (isRefresh: boolean) => void;
}

const ModalEditPublication: React.FC<ModalEditPublicationProps> = ({
  isOpen,
  publication,
  onRequestClose,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [initialData, setInitialData] =
    useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (publication) {
      setInitialData({
        situacao: publication.situacao,
        categoria: getOption(publication.categoria, selectOptions.category),
        sexo: getOption(publication.sexo, selectOptions.sex),
        porte: getOption(publication.porte, selectOptions.size),
        cor: publication.cor || '',
        nome: publication.nome || '',
        observacoes: publication.observacoes || '',
      });
    }
  }, [publication]);

  const handleSubmit = useCallback(
    async (data: UpdatePublicationData) => {
      try {
        if (!data.situacao) {
          warnToast({
            message: 'Informe a situação para alterar a publicação.',
          });
          return;
        }

        const schema = Yup.object().shape({
          categoria: Yup.string().required(),
          porte: Yup.string().required(),
          sexo: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let parsedData = { ...data };

        Object.keys(parsedData).forEach(value => {
          if (parsedData[value] === undefined || parsedData[value] === '') {
            parsedData = removeKeys(parsedData, [value]);
          }
        });

        await getAPIClient().patch(
          `publicacoes/${publication.publicacaoId}`,
          parsedData,
        );

        successToast({
          message: 'Publicação alterada com sucesso',
          options: {
            position: 'top-right',
          },
        });

        onRequestClose(true);
      } catch (err) {
        handleErrors({
          err,
          formHandles: formRef.current,
          description: 'Erro ao salvar publicação',
        });
      }
    },
    [publication],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose(false)}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={() => onRequestClose(false)}
        title="Fechar"
      >
        <FiX className="react-modal-close" size={22} />
      </button>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <ImageRadioButton name="situacao" options={radioButtonOptions} />
        <FlexItems>
          <Select
            name="categoria"
            label="Categoria"
            options={selectOptions.category}
          />
          <Select name="porte" label="Porte" options={selectOptions.size} />
          <Select
            name="sexo"
            label="Sexo do Animal"
            options={selectOptions.sex}
          />
          <Input name="cor" label="Cor" />
        </FlexItems>

        <FlexItems hasMargin>
          <Input name="nome" label="Nome do Pet" />
        </FlexItems>

        <FlexItems hasMargin>
          <Textarea name="observacoes" label="Observacoes" />
        </FlexItems>

        <FormButtons>
          <Button
            type="button"
            styleType="red"
            title="Cancelar"
            onClick={() => onRequestClose(false)}
          >
            <FiX size={22} />
            Cancelar
          </Button>
          <Button type="submit" styleType="green" title="Salvar Alterações">
            <FiCheck size={22} />
            Salvar Alterações
          </Button>
        </FormButtons>
      </Form>
    </Modal>
  );
};

export { ModalEditPublication };
