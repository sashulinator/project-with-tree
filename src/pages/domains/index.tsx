import './index.css'

import { useState } from 'react'

import { useCreateAttribute } from '~/api/attribute/create'
import { useRemoveAttribute } from '~/api/attribute/remove'
import { CreateAttribute } from '~/api/attribute/requests/create'
import { UpdateAttribute } from '~/api/attribute/requests/update'
import { useUpdateAttribute } from '~/api/attribute/update'
import { useCreateDomain } from '~/api/domain/create'
import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useRemoveDomain } from '~/api/domain/remove'
import { CreateDomain } from '~/api/domain/requests/create'
import { UpdateDomain } from '~/api/domain/requests/update'
import { useUpdateDomain } from '~/api/domain/update'
import { AttributeForm } from '~/entities/attribute'
import { DomainForm, DomainList } from '~/entities/domain'
import { notify } from '~/shared/notify'
import { GhostButton } from '~/ui/button'
import Modal from '~/ui/modal'
import Dialog from '~/ui/modal/variants/dialog/ui/dialog'
import { Id, has } from '~/utils/core'

DomainListPage.displayName = 'DomainListPage'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [addAttributeDomainId, setAddAttributeDomainId] = useState<Id | null>(null)
  const [addDomainParentId, setAddDomainParentId] = useState<Id | null>(null)
  const [updateDomain, setUpdateDomain] = useState<UpdateDomain | null>(null)
  const [updateAttribute, setUpdateAttribute] = useState<UpdateAttribute | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ id: Id; name: string } | null>(null)

  const createDomainMutation = useCreateDomain({
    onSuccess: () => {
      void fetcher.refetch()
      setAddDomainParentId(null)
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const createAttributeMutation = useCreateAttribute({
    onSuccess: () => {
      void fetcher.refetch()
      setAddAttributeDomainId(null)
      notify({ data: 'Создано', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const updateDomainMutation = useUpdateDomain({
    onSuccess: () => {
      void fetcher.refetch()
      setUpdateDomain(null)
      notify({ data: 'Изменено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const updateAttributeMutation = useUpdateAttribute({
    onSuccess: () => {
      void fetcher.refetch()
      setUpdateAttribute(null)
      notify({ data: 'Изменено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const removeDomainMutation = useRemoveDomain({
    onSuccess: () => {
      void fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const removeAttributeMutation = useRemoveAttribute({
    onSuccess: () => {
      void fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <>
      <main className={DomainListPage.displayName}>
        <GhostButton
          height={'l'}
          padding={'l'}
          className='add-domain-button'
          onClick={(): void => setAddDomainParentId('')}
        >
          Добавить домен
        </GhostButton>

        {/*Редактирование атрибута*/}
        <Modal firstFocused={true} opened={updateAttribute !== null} onDismiss={(): void => setUpdateAttribute(null)}>
          <AttributeForm
            key={`${(updateAttribute?.id, updateAttribute?.name)}`}
            onSubmit={createUpdateAttribute}
            attribute={updateAttribute !== null ? updateAttribute : {}}
          />
        </Modal>

        {/*Создание атрибута*/}
        <Modal
          firstFocused={true}
          opened={addAttributeDomainId !== null}
          onDismiss={(): void => setAddAttributeDomainId(null)}
        >
          <AttributeForm
            key={addDomainParentId}
            onSubmit={createUpdateAttribute}
            attribute={{
              domainId: addAttributeDomainId || '',
            }}
          />
        </Modal>

        {/*Редактирование домена*/}
        <Modal
          firstFocused={true}
          opened={addDomainParentId !== null}
          onDismiss={(): void => setAddDomainParentId(null)}
        >
          <DomainForm
            key={addDomainParentId}
            onSubmit={createUpdateDomain}
            domain={{
              parentId: addDomainParentId || '',
            }}
          />
        </Modal>

        {/*Создание домена*/}
        <Modal firstFocused={true} opened={updateDomain !== null} onDismiss={(): void => setUpdateDomain(null)}>
          <DomainForm
            key={`${updateDomain?.id}${updateDomain?.keyName}`}
            onSubmit={createUpdateDomain}
            domain={updateDomain !== null ? updateDomain : {}}
          />
        </Modal>
        {/* Удаление домена */}
        <Dialog
          firstFocused={true}
          text={`Вы уверены что хотите удалить домен: ${deleteModal?.name}?`}
          onSubmit={removeDomain}
          opened={deleteModal}
          onDismiss={(): void => setDeleteModal(null)}
        />
        {/* Удаление атрибута */}
        <Dialog
          firstFocused={true}
          text={`Вы уверены что хотите удалить атрибут: ${deleteModal?.name}?`}
          onSubmit={removeAttribute}
          opened={deleteModal}
          onDismiss={(): void => setDeleteModal(null)}
        />
        {fetcher.isSuccess && (
          <DomainList
            isRightToEdit={true}
            list={fetcher.data.items}
            setAddAttributeDomainId={setAddAttributeDomainId}
            setAddDomainParentId={setAddDomainParentId}
            openModalDialog={openModalDialog}
            setUpdateDomain={setUpdateDomain}
            setUpdateAttribute={setUpdateAttribute}
          />
        )}
      </main>
    </>
  )

  function openModalDialog(obj: { id: Id; name: string }): void {
    setDeleteModal({ id: obj.id, name: obj.name })
  }

  function removeDomain(): void {
    if (deleteModal) {
      removeDomainMutation.mutate({ id: deleteModal.id })
      setDeleteModal(null)
    }
  }

  function removeAttribute(): void {
    if (deleteModal) {
      removeAttributeMutation.mutate({ id: deleteModal.id })
      setDeleteModal(null)
    }
  }

  function createUpdateAttribute(attribute: CreateAttribute | UpdateAttribute): void {
    if (has(attribute, 'id')) {
      updateAttributeMutation.mutate({ attribute })
    } else {
      createAttributeMutation.mutate({ attribute })
    }
  }

  function createUpdateDomain(domain: CreateDomain | UpdateDomain): void {
    if (has(domain, 'id')) {
      updateDomainMutation.mutate({ domain })
    } else {
      createDomainMutation.mutate({ domain })
    }
  }
}
