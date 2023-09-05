import { useState } from 'react'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { AddAttribute } from '~/entities/domain/ui/add-attribute/ui/add-attribute'
import { AddDomain } from '~/entities/domain/ui/add-domain'
import { Domain } from '~/entities/domain/ui/domain-item'
import { GhostButton } from '~/ui/button'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [isAddDomainActive, setAddDomainActive] = useState(false)
  const [isAddAttributeActive, setAddAttributeActive] = useState(false)
  const [parentId, setParentId] = useState('')
  const [domainId, setDomainId] = useState('')

  return (
    <>
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '10px' }}>
        <GhostButton onClick={(): void => handleAddDomainOpen('')}>Добавить домен</GhostButton>

        <AddAttribute
          opened={isAddAttributeActive}
          fetcher={fetcher}
          domainId={domainId}
          handleAddAttributeClose={handleAddAttributeClose}
        />
        <AddDomain
          opened={isAddDomainActive}
          fetcher={fetcher}
          parentId={parentId}
          handleAddDomainClose={handleAddDomainClose}
        />
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
    setParentId(id)
    setAddDomainActive(true)
  }

  function handleAddDomainClose(): void {
    setAddDomainActive(false)
    setParentId('')
  }

  function handleAddAttributeOpen(id: string): void {
    setDomainId(id)
    setAddAttributeActive(true)
  }

  function handleAddAttributeClose(): void {
    setAddAttributeActive(false)
    setDomainId('')
  }
}
