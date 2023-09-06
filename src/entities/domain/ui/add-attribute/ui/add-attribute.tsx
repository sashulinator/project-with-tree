import { useForm } from 'react-hook-form'

import Flex from '~/abstract/flex'
import { CreateAttribute } from '~/api/attribute/requests/create'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled/ui/labeled'
import Modal from '~/ui/modal'
import { Id, c } from '~/utils/core'

interface Props {
  domainId: Id | null
  opened: boolean
  close: () => void
  create: (attribute: CreateAttribute) => void
}

export function AddAttribute(props: Props): JSX.Element | null {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<CreateAttribute>()

  if (props.domainId === null) return null

  return (
    <Modal firstFocused={true} opened={props.opened} onDismiss={props.close}>
      <Flex width='25rem' dir='column'>
        <Flex
          as='form'
          dir='column'
          crossAxis='stretch'
          gap='xl'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(props.create)}
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
                defaultValue={props.domainId}
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
    </Modal>
  )
}
