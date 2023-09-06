import './form.css'

import { useForm } from 'react-hook-form'

import { CreateDomain } from '~/api/domain/requests/create'
import { Domain } from '~/entities/domain/types/domain'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import { c } from '~/utils/core'

Form.displayName = 'domain-Form'

export interface Props {
  className?: string
  domain: Partial<Domain>
  onSubmit: (domain: CreateDomain | Domain) => void
}

export default function Form(props: Props): JSX.Element | null {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDomain>({ defaultValues: props.domain })

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(props.onSubmit)} style={{ minWidth: '600px' }}>
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
        <Input readOnly className={c('add-domain-input', errors.parentId && '--error')} {...register('parentId')} />
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
  )
}
