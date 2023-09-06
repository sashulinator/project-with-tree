import { Domain } from 'domain'
import { useState } from 'react'

import { useCreateAttribute } from '~/api/attribute/create'
import { useRemoveAttribute } from '~/api/attribute/remove'
import { CreateAttribute } from '~/api/attribute/requests/create'
import { useCreateDomain } from '~/api/domain/create'
import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useRemoveDomain } from '~/api/domain/remove'
import { CreateDomain } from '~/api/domain/requests/create'
import { Form, List } from '~/entities/domain'
import { AddAttribute } from '~/entities/domain/ui/add-attribute/ui/add-attribute'
import { notify } from '~/shared/notify'
import { GhostButton } from '~/ui/button'
import Modal from '~/ui/modal'
import { Id, has } from '~/utils/core'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [addAttributeDomainId, setAddAttributeDomainId] = useState<Id | null>(null)
  const [addDomainParentId, setAddDomainParentId] = useState<Id | null>(null)

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
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '10px' }}>
        <GhostButton onClick={(): void => setAddDomainParentId('')}>Добавить домен</GhostButton>

        <AddAttribute
          key={addAttributeDomainId}
          close={(): void => setAddAttributeDomainId(null)}
          opened={addAttributeDomainId !== null}
          create={createAttribute}
          domainId={addAttributeDomainId}
        />
        <Modal
          firstFocused={true}
          opened={addDomainParentId !== null}
          onDismiss={(): void => setAddDomainParentId(null)}
        >
          <Form
            key={addDomainParentId}
            onSubmit={createDomain}
            domain={{
              parentId: addDomainParentId || '',
            }}
          />
        </Modal>
        {fetcher.isSuccess && (
          <List
            setAddAttributeDomainId={setAddAttributeDomainId}
            setAddDomainParentId={setAddDomainParentId}
            list={fetcher.data.items}
            removeAttribute={removeAttribute}
            removeDomain={removeDomain}
          />
        )}
      </main>
    </>
  )

  function removeDomain(id: Id): void {
    removeDomainMutation.mutate({ id })
  }

  function createAttribute(attribute: CreateAttribute): void {
    createAttributeMutation.mutate({ attribute })
  }

  function createDomain(domain: Domain | CreateDomain): void {
    if (has(domain, 'id')) {
      // updateDomainMutation.mutate({ domain: domain as Domain })
    } else {
      createDomainMutation.mutate({ domain: domain as CreateDomain })
    }
  }

  function removeAttribute(id: Id): void {
    removeAttributeMutation.mutate({ id })
  }
}
