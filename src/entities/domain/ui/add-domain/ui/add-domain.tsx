import './add-domain.css'

import { useForm } from 'react-hook-form'

import Modal from '~/abstract/modal/ui/modal'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import { c } from '~/utils/core'

interface Props {
  handleModalClose: () => void
  parentId: string
}

export function AddDomain(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data): void => console.log(data)

  // console.log(watch('name'))
  return (
    <Modal title='Создать домен' onClose={props.handleModalClose}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Имя домена
          <Input
            className={c('add-domain-input', errors.name && '--error')}
            {...register('name', { required: true })}
          />
          {errors.name && <span>Обязательное поле</span>}
        </label>
        <label>
          keyName домена
          <Input
            className={c('add-domain-input', errors.keyName && '--error')}
            {...register('keyName', { required: true })}
          />
          {errors.keyName && <span>Обязательное поле</span>}
        </label>
        <label>
          Описание домена
          <Input
            className={c('add-domain-input', errors.description && '--error')}
            {...register('description', { required: true })}
          />
          {errors.description && <span>Обязательное поле</span>}
        </label>
        <label>
          Тип домена
          <Input
            defaultValue={'комплексный'}
            className={c('add-domain-input', errors.type && '--error')}
            {...register('type', { required: true })}
          />
          {errors.type && <span>Обязательное поле</span>}
        </label>
        <label>
          {'parentId домена'}
          <Input
            disabled
            value={props.parentId}
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
