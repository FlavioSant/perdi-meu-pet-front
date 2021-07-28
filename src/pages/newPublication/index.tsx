import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { parseCookies } from 'nookies';

import { FiCheck, FiImage, FiX } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { api } from '../../services/api';
import { radioButtonOptions, selectOptions } from '../../utils/inputsOptions';
import { handleErrors } from '../../utils/handleErrors';
import { uploadAnexo } from '../../utils/uploadAnexos';
import { parseNewPublication } from '../../utils/parseNewPublication';
import { successToast, warnToast } from '../../utils/toast';

import { PageContainer } from '../../components/PageContainer';
import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { Input } from '../../components/Input';
import { InputFile } from '../../components/InputFile';
import { ImageRadioButton } from '../../components/ImageRadioButton';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { PreviewImages } from '../../components/PreviewImages';
import { Button } from '../../components/Button';
import { FlexItems } from '../../components/FlexItems';
import { ClickableMap } from '../../components/Map/index';
import Modal, { ModalHandles } from '../../components/Modal';

import { MapContainer, FormButtons, PreviewImagesContainer } from './styles';

interface Position {
  lat: number;
  lng: number;
}

interface PreviewImageProps {
  url: string;
  name: string;
}

export interface NewPublicationData {
  categoria: string;
  cor: string;
  nome: string;
  observacoes: string;
  porte: string;
  sexo: string;
  situacao: string;
}

const NewPublication: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const modalRef = useRef<ModalHandles>(null);

  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 });
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImageProps[]>([]);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      if (e.target.files.length > 4) {
        modalRef.current.openModal();
        return;
      }

      const uploadedFiles = Array.from(e.target.files);

      const parsedPreviewImages = uploadedFiles.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      setFiles(uploadedFiles);
      setPreviewImages(parsedPreviewImages);
    },
    [files],
  );

  const removeFiles = useCallback(
    (index: number) => {
      setFiles(files.filter((_, i) => index !== i));
      setPreviewImages(previewImages.filter((_, i) => index !== i));
    },
    [files, previewImages],
  );

  const handleMapClick = useCallback(
    (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;

      setPosition({ lat, lng });
    },
    [position],
  );

  const handleSubmit = useCallback(
    async (data: NewPublicationData) => {
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

        router.push('/');
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
      <Modal ref={modalRef} title="Informação" message="No máximo 4 imagens." />

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
            <Input name="cor" label="Cor" />
          </FlexItems>

          <FlexItems hasMargin>
            <Input name="nome" label="Nome do Pet" />
            <InputFile
              name="images"
              accept="image/*"
              description="Adicione Imagens do Pet"
              icon={FiImage}
              multiple
              onChange={handleFileChange}
            />
          </FlexItems>

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
            <Button type="button" styleType="red" title="Cancelar">
              <FiX size={22} />
              Cancelar
            </Button>
            <Button type="submit" styleType="green" title="Finalizar Cadastro">
              <FiCheck size={22} />
              Finalizar Cadastro
            </Button>
          </FormButtons>
        </Form>
      </PageContainer>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['perdi-meu-pet']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default NewPublication;
