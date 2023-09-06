import { useState } from 'react'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { AddAttribute } from '~/entities/domain/ui/add-attribute/ui/add-attribute'
import { AddDomain } from '~/entities/domain/ui/add-domain'
import { Domain } from '~/entities/domain/ui/item'
import { GhostButton } from '~/ui/button'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [isAddDomainActive, setAddDomainActive] = useState({ isActive: false, parentId: '' })
  const [isAddAttributeActive, setAddAttributeActive] = useState({ isActive: false, domainId: '' })

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
        {fetcher.isSuccess &&
          fetcher.data.items.map((item) => (
            <Domain
              handleAddAttributeOpen={handleAddAttributeOpen}
              handleAddDomainOpen={handleAddDomainOpen}
              key={item.domain.id}
              domainData={item}
              fetcher={fetcher}
            />
          ))}
      </main>
    </>
  )

  // Private
  function handleAddDomainOpen(id: string): void {
    setAddDomainActive({ isActive: true, parentId: id })
  }

  function handleAddDomainClose(): void {
    setAddDomainActive({ isActive: false, parentId: '' })
  }

  function handleAddAttributeOpen(id: string): void {
    setAddAttributeActive({ isActive: true, domainId: id })
  }

  function handleAddAttributeClose(): void {
    setAddAttributeActive({ isActive: false, domainId: '' })
  }
}
