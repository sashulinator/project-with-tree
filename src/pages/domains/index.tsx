import { useState } from 'react'

import { useRemoveAttribute } from '~/api/attribute/remove'
import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { useRemoveDomain } from '~/api/domain/remove'
import { List } from '~/entities/domain'
import { AddAttribute } from '~/entities/domain/ui/add-attribute/ui/add-attribute'
import { AddDomain } from '~/entities/domain/ui/add-domain'
import { notify } from '~/shared/notify'
import { GhostButton } from '~/ui/button'
import { Id } from '~/utils/core'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [isAddDomainActive, setAddDomainActive] = useState({ isActive: false, parentId: '' as Id })
  const [isAddAttributeActive, setAddAttributeActive] = useState({ isActive: false, domainId: '' as Id })

  const mutationDomain = useRemoveDomain({
    onSuccess: () => {
      void fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const mutationAttribute = useRemoveAttribute({
    onSuccess: () => {
      void fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <>
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '10px' }}>
        <GhostButton onClick={(): void => handleAddDomainOpen('')}>Добавить домен</GhostButton>

        {isAddAttributeActive.isActive && (
          <AddAttribute
            key={isAddDomainActive.parentId}
            opened={isAddAttributeActive.isActive}
            fetcher={fetcher}
            domainId={isAddAttributeActive.domainId}
            handleAddAttributeClose={handleAddAttributeClose}
          />
        )}
        {isAddDomainActive.isActive && (
          <AddDomain
            opened={isAddDomainActive.isActive}
            fetcher={fetcher}
            parentId={isAddDomainActive.parentId}
            handleAddDomainClose={handleAddDomainClose}
          />
        )}
        {fetcher.isSuccess && (
          <List
            handleAddAttributeOpen={handleAddAttributeOpen}
            handleAddDomainOpen={handleAddDomainOpen}
            list={fetcher.data.items}
            removeAttribute={removeAttribute}
            removeDomain={removeDomain}
          />
        )}
      </main>
    </>
  )

  // Private
  function handleAddDomainOpen(id: Id): void {
    setAddDomainActive({ isActive: true, parentId: id })
  }

  function removeDomain(id: Id): void {
    mutationDomain.mutate({ id })
  }

  function removeAttribute(id: Id): void {
    mutationAttribute.mutate({ id })
  }

  function handleAddDomainClose(): void {
    setAddDomainActive({ isActive: false, parentId: '' })
  }

  function handleAddAttributeOpen(id: Id): void {
    setAddAttributeActive({ isActive: true, domainId: id })
  }

  function handleAddAttributeClose(): void {
    setAddAttributeActive({ isActive: false, domainId: '' })
  }
}
