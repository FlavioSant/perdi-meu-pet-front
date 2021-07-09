import { NextPage } from 'next';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { FiCheck, FiImage, FiX } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { handleErrors } from '../../utils/handleErrors';

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

import { MapContainer, FormButtons, PreviewImagesContainer } from './styles';

interface PreviewImageProps {
  url: string;
  name: string;
}

const NewPublication: NextPage = () => {
  const formRef = useRef<FormHandles>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImageProps[]>([]);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      if (e.target.files.length > 4) {
        alert('Max 4 images!');
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

  const handleSubmit = useCallback(async (data: Record<string, any>) => {
    try {
      console.log(data);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        categoria: Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .nullable()
          .required(),
        porte: Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string(),
          })
          .nullable()
          .required(),
        cor: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      handleErrors({ err, formHandles: formRef.current });
    }
  }, []);

  return (
    <PageLayout>
      <PageTitle title="Crie sua Publicação" />
      <PageContainer description="Dados do Pet">
        <MapContainer>
          <div />
          <footer>Clique no mapa para adicionar a localização</footer>
        </MapContainer>

        <p>Informe a situação do pet abaixo:</p>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <ImageRadioButton
            name="situacao"
            options={[
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
            ]}
          />
          <FlexItems>
            <Select
              name="categoria"
              label="Categoria"
              options={[
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
              ]}
            />
            <Select
              name="porte"
              label="Porte"
              options={[
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
              ]}
            />
            <Select
              name="sexoAnimal"
              label="Sexo do Animal"
              options={[
                {
                  label: 'Fêmea',
                  value: 'femea',
                },
                {
                  label: 'Macho',
                  value: 'macho',
                },
              ]}
            />
            <Input name="cor" label="Cor" />
          </FlexItems>

          <FlexItems hasMargin>
            <Input name="nomePet" label="Nome do Pet" />
            <InputFile
              name="image"
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

export default NewPublication;
