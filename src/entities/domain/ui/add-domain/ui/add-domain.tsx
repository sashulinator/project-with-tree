import './add-domain.css'

import { useForm } from 'react-hook-form'

import { CreateDomain } from '~/api/domain/requests/create'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Modal from '~/ui/modal'
import { Id, c } from '~/utils/core'

AddDomain.displayName = 'domain-AddDomain'

interface Props {
  className?: string
  parentId: Id | null
  opened: boolean
  close: () => void
  create: (domain: CreateDomain) => void
}

export function AddDomain(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: { errors },
  } = useForm<CreateDomain>()

  return (
    <Modal className={c(props.className, AddDomain.displayName)} opened={props.opened} onDismiss={props.close}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit(props.create)} style={{ minWidth: '600px' }}>
        <label>
          Имя
          <Input
            id='name'
            className={c('add-domain-input', errors.name && '--error')}
            {...register('name', { required: true })}
          />
          {errors.name && <span>Обязательное поле</span>}
        </label>
        <label>
          keyName
          <Input
            className={c('add-domain-input', errors.keyName && '--error')}
            {...register('keyName', { required: true })}
          />
          {errors.keyName && <span>Обязательное поле</span>}
        </label>
        <label>
          Описание
          <Input
            className={c('add-domain-input', errors.description && '--error')}
            {...register('description', { required: true })}
          />
          {errors.description && <span>Обязательное поле</span>}
        </label>
        <label>
          Тип
          <Input
            defaultValue={'комплексный'}
            className={c('add-domain-input', errors.type && '--error')}
            {...register('type', { required: true })}
          />
          {errors.type && <span>Обязательное поле</span>}
        </label>
        <label>
          {'parentId'}
          <Input
            readOnly
            defaultValue={props.parentId}
            className={c('add-domain-input', errors.parentId && '--error')}
            {...register('parentId')}
          />
        </label>
        <label>
          sourceSystemId домена
          <Input
            defaultValue={'1'}
            className={c('add-domain-input', errors.sourceSystemId && '--error')}
            {...register('sourceSystemId', { required: true })}
          />
          {errors.sourceSystemId && <span>Обязательное поле</span>}
        </label>
        <label>
          userId пользователя
          <Input
            defaultValue={'user@mail.ru'}
            className={c('add-domain-input', errors.userId && '--error')}
            {...register('userId', { required: true })}
          />
          {errors.userId && <span>Обязательное поле</span>}
        </label>
        <PrimaryButton type='submit'>Создать</PrimaryButton>
      </form>
    </Modal>
  )
}
