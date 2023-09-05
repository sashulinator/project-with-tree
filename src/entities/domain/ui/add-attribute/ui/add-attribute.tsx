import './add-attribute.css'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { QueryResult } from '~/api/domain/fetch-parent-domains'
import { requestAttribute } from '~/api/domain/request/create-attribute'
import { ResponseData } from '~/api/domain/request/fetch-parent-domains'
import { RequestAttribute } from '~/api/domain/types/request-attribute'
import { notify } from '~/shared/notify'
import { PrimaryButton } from '~/ui/button'
import Input from '~/ui/input'
import Modal from '~/ui/modal'
import { c } from '~/utils/core'

interface Props {
  handleAddAttributeClose: () => void
  domainId: string
  fetcher: QueryResult<ResponseData>
  opened: boolean
}

export function AddAttribute(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const mutation = useMutation(requestAttribute, {
    onSuccess: () => {
      void props.fetcher.refetch()
      notify({ data: 'Сохранено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  // console.log(watch('name'))
  return (
    <Modal opened={props.opened} onDismiss={props.handleAddAttributeClose}>
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
            readOnly
            value={props.domainId}
            className={c('add-attribute-input', errors.parentId && '--error')}
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
  function onSubmit(data): void {
    console.log(data)
    mutation.mutate(data as RequestAttribute)
  }
}
