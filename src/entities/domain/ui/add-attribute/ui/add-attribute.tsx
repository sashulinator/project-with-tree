import './add-attribute.css'

import { useForm } from 'react-hook-form'

import { CreateAttribute } from '~/api/attribute/requests/create'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Modal from '~/ui/modal'
import { Id, c } from '~/utils/core'

interface Props {
  domainId: Id
  opened: boolean
  close: () => void
  create: (attribute: CreateAttribute) => void
}

export function AddAttribute(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<CreateAttribute>()

  return (
    <Modal opened={props.opened} onDismiss={props.close}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '600px' }}>
        <label>
          Имя атрибута
          <Input
            className={c('add-attribute-input', errors.name && '--error')}
            {...register('name', { required: true })}
          />
          {errors.name && <span>Обязательное поле</span>}
        </label>
        <label>
          keyName атрибута
          <Input
            className={c('add-attribute-input', errors.keyName && '--error')}
            {...register('keyName', { required: true })}
          />
          {errors.keyName && <span>Обязательное поле</span>}
        </label>
        <label>
          Описание атрибута
          <Input
            className={c('add-attribute-input', errors.description && '--error')}
            {...register('description', { required: true })}
          />
          {errors.description && <span>Обязательное поле</span>}
        </label>
        <label>
          Тип атрибута
          <Input
            defaultValue={'string'}
            className={c('add-attribute-input', errors.type && '--error')}
            {...register('type', { required: true })}
          />
          {errors.type && <span>Обязательное поле</span>}
        </label>
        <label>
          {'Id домена'}
          <Input
            readOnly
            defaultValue={props.domainId}
            className={c('add-attribute-input', errors.domainId && '--error')}
            {...register('domainId', { required: true })}
          />
        </label>
        <label>
          userId пользователя
          <Input
            defaultValue={'user@mail.ru'}
            className={c('add-attribute-input', errors.userId && '--error')}
            {...register('userId', { required: true })}
          />
          {errors.userId && <span>Обязательное поле</span>}
        </label>

        <PrimaryButton type='submit'>Создать</PrimaryButton>
      </form>
    </Modal>
  )

  //Private
  function onSubmit(data: CreateAttribute): void {
    props.create(data)
  }
}
