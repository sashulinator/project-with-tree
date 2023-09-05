import './add-domain.css'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { QueryResult } from '~/api/domain/fetch-parent-domains'
import { requestDomain } from '~/api/domain/request/create-domain'
import { ResponseData } from '~/api/domain/request/fetch-parent-domains'
import { RequestDomain } from '~/api/domain/types/request-domain'
import { notify } from '~/shared/notify'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Modal from '~/ui/modal'
import { c } from '~/utils/core'

interface Props {
  handleAddDomainClose: () => void
  parentId: string
  fetcher: QueryResult<ResponseData>
  opened: boolean
}

export function AddDomain(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const mutation = useMutation(requestDomain, {
    onSuccess: () => {
      void props.fetcher.refetch()
      notify({ data: 'Сохранено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  // console.log(watch('name'))
  return (
    <Modal opened={props.opened} onDismiss={props.handleAddDomainClose}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Имя домена
          <Input
            id='name'
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

  // Private
  function onSubmit(data): void {
    mutation.mutate(data as RequestDomain)
  }
}
