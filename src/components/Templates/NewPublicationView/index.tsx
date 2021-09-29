import Router from 'next/router';
import { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { LeafletMouseEvent } from 'leaflet';
import { FiCheck, FiImage, FiX } from 'react-icons/fi';

import { Position } from '../../../types/position';
import { CreatePublicationData } from '../../../types/pages/createPublication';

import {
  radioButtonOptions,
  selectOptions,
} from '../../../utils/inputsOptions';
import { api } from '../../../services/api';
import { uploadAnexo } from '../../../utils/uploadAnexos';
import { successToast, warnToast } from '../../../utils/toast';
import { handleErrors } from '../../../functions/handleErrors';
import { parseNewPublication } from '../../../functions/parsePublications';

import { ClickableMap } from '../../Map';
import { Input } from '../../Forms/Input';
import { Button } from '../../Forms/Button';
import { FlexItems } from '../../FlexItems';
import { Select } from '../../Forms/Select';
import { Textarea } from '../../Forms/Textarea';
import { InputFile } from '../../Forms/InputFile';
import { InputMask } from '../../Forms/InputMask';
import { PageTitle } from '../../Layout/PageTitle';
import { PreviewImages } from '../../PreviewImages';
import { PageLayout } from '../../Layout/PageLayout';
import { PageContainer } from '../../Layout/PageContainer';
import { ImageRadioButton } from '../../Forms/ImageRadioButton';
import ModalInfo, { ModalInfoHandles } from '../../Modais/ModalInfo';

import { FormButtons, MapContainer, PreviewImagesContainer } from './styles';

interface PreviewImageProps {
  url: string;
  name: string;
}

export const NewPublicationView: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef<ModalInfoHandles>(null);

  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 });
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImageProps[]>([]);

  const handleFileChange = useCallback(
    (fileList: FileList) => {
      if (!fileList) {
        return;
      }

      if (fileList.length > 4) {
        modalRef.current.openModal();
        return;
      }

      const uploadedFiles = Array.from(fileList);

      const parsedPreviewImages = uploadedFiles.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      setFiles(uploadedFiles);
      setPreviewImages(parsedPreviewImages);
    },
    [files],
  );

  const removeFiles = useCallback((index: number) => {
    setFiles(state => state.filter((_, i) => index !== i));
    setPreviewImages(state => state.filter((_, i) => index !== i));
  }, []);

  const handleMapClick = useCallback(
    (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;

      setPosition({ lat, lng });
    },
    [position],
  );

  const handleSubmit = useCallback(
    async (data: CreatePublicationData) => {
      try {
        formRef.current.setErrors({});

        if (position.lat === 0) {
          warnToast({
            message:
              'Adicione a localização no mapa para cadastrar a publicação.',
          });
          return;
        }

        if (!data.situacao) {
          warnToast({
            message: 'Informe a situação para cadastrar a publicação.',
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

        let anexosIds = undefined;

        if (files.length > 0) {
          const responses = await Promise.all(
            files.map(file => uploadAnexo(api, file)),
          );

          anexosIds = responses.map(({ anexoId }) => anexoId);
        }

        const parsedData = parseNewPublication(data, position, anexosIds);

        await api.post('publicacoes', parsedData);

        successToast({ message: 'Publicação cadastrada com sucesso.' });

        Router.push('/');
      } catch (err) {
        handleErrors({
          err,
          formHandles: formRef.current,
          description: 'Erro ao salvar publicação',
        });
      }
    },
    [files, position],
  );

  return (
    <PageLayout>
      <ModalInfo
        ref={modalRef}
        title="Informação"
        message="No máximo 4 imagens."
      />

      <PageTitle title="Crie sua Publicação" />

      <PageContainer description="Dados do Pet">
        <MapContainer>
          <ClickableMap
            center={{ lat: -22.3273639, lng: -49.0735853 }}
            position={position}
            onMapClick={handleMapClick}
          />
          <footer>Clique no mapa para adicionar a localização</footer>
        </MapContainer>

        <p>Informe a situação do pet abaixo:</p>

        <Form ref={formRef} onSubmit={handleSubmit}>
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
          </FlexItems>

          <FlexItems hasMargin>
            <Input name="cor" label="Cor" />
            <InputMask name="celular" label="Celular" mask="(99) 99999-9999" />
            <Input name="nome" label="Nome do Pet" />
          </FlexItems>
          <br />
          <InputFile
            name="images"
            accept="image/*"
            description="Adicione Imagens do Pet"
            icon={FiImage}
            multiple
            onChange={e => handleFileChange(e.target.files)}
          />

          {previewImages.length > 0 && (
            <PreviewImagesContainer>
              {previewImages.map((image, index) => (
                <PreviewImages
                  key={index}
                  image={image}
                  onRemove={() => removeFiles(index)}
                />
              ))}
            </PreviewImagesContainer>
          )}

          <FlexItems hasMargin>
            <Textarea name="observacoes" label="Observacoes" />
          </FlexItems>

          <FormButtons>
            <Button
              type="button"
              background="red"
              title="Cancelar"
              onClick={() => Router.push('/')}
            >
              <FiX size={22} />
              Cancelar
            </Button>
            <Button type="submit" background="green" title="Finalizar Cadastro">
              <FiCheck size={22} />
              Finalizar Cadastro
            </Button>
          </FormButtons>
        </Form>
      </PageContainer>
    </PageLayout>
  );
};
