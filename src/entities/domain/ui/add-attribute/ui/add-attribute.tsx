import './add-attribute.css'

import { useForm } from 'react-hook-form'

import Modal from '~/abstract/modal/ui/modal'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import { c } from '~/utils/core'

interface Props {
  handleAddAttributeClose: () => void
  domainId: string
}

export function AddAttribute(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data): void => console.log(data)

  // console.log(watch('name'))
  return (
    <Modal title='Добавить атрибут' onClose={props.handleAddAttributeClose}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled
            value={props.domainId}
            className={c('add-attribute-input', errors.parentId && '--error')}
            {...register('parentId')}
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
}
