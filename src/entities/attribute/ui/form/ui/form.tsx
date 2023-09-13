import { useForm } from 'react-hook-form'

import Flex from '~/abstract/flex'
import { CreateAttribute } from '~/api/attribute/requests/create'
import { Attribute } from '~/entities/attribute/types/attribute'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled/ui/labeled'
import { c } from '~/utils/core'

export interface Props {
  attribute: Partial<Attribute>
  onSubmit: (attribute: CreateAttribute) => void
}

export default function Form(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<CreateAttribute>({ defaultValues: props.attribute })

  return (
    <Flex width='25rem' dir='column'>
      <Flex
        as='form'
        dir='column'
        crossAxis='stretch'
        gap='xl'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(props.onSubmit)}
        width='100%'
      >
        <div>
          <Labeled label='Имя'>
            <Input
              className={c('add-attribute-input', errors.name && '--error')}
              {...register('name', { required: true })}
            />
          </Labeled>
          {errors.name && <span>Обязательное поле</span>}
        </div>
        <div>
          <Labeled label='keyName'>
            <Input
              className={c('add-attribute-input', errors.keyName && '--error')}
              {...register('keyName', { required: true })}
            />
          </Labeled>
          {errors.keyName && <span>Обязательное поле</span>}
        </div>
        <div>
          <Labeled label='Описание'>
            <Input
              className={c('add-attribute-input', errors.description && '--error')}
              {...register('description', { required: true })}
            />
          </Labeled>
          {errors.description && <span>Обязательное поле</span>}
        </div>
        <div>
          <Labeled label='Тип'>
            <Input
              defaultValue={'string'}
              className={c('add-attribute-input', errors.type && '--error')}
              {...register('type', { required: true })}
            />
          </Labeled>
          {errors.type && <span>Обязательное поле</span>}
        </div>
        <div>
          <Labeled label='Id домена'>
            <Input
              readOnly
              className={c('add-attribute-input', errors.domainId && '--error')}
              {...register('domainId', { required: true })}
            />
          </Labeled>
        </div>
        <div>
          <Labeled label='Id пользователя'>
            <Input
              defaultValue={'user@mail.ru'}
              className={c('add-attribute-input', errors.userId && '--error')}
              {...register('userId', { required: true })}
            />
          </Labeled>
          {errors.userId && <span>Обязательное поле</span>}
        </div>
        <Flex mainAxis='end'>
          <PrimaryButton type='submit'>Создать</PrimaryButton>
        </Flex>
      </Flex>
    </Flex>
  )
}
