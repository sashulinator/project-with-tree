import { useState } from 'react'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { AddAttribute } from '~/entities/domain/ui/add-attribute/ui/add-attribute'
import { AddDomain } from '~/entities/domain/ui/add-domain'
import { Domain } from '~/entities/domain/ui/domain-item'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [isAddDomainActive, setAddDomainActive] = useState(false)
  const [isAddAttributeActive, setAddAttributeActive] = useState(false)
  const [parentId, setParentId] = useState('')
  const [domainId, setDomainId] = useState('')

  return (
    <>
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {isAddDomainActive && <AddDomain parentId={parentId} handleAddDomainClose={handleAddDomainClose} />}
        {isAddAttributeActive && <AddAttribute domainId={domainId} handleAddAttributeClose={handleAddAttributeClose} />}
        {fetcher.isSuccess &&
          fetcher.data.items.map((item) => (
            <Domain
              handleAddAttributeOpen={handleAddAttributeOpen}
              handleAddDomainOpen={handleAddDomainOpen}
              key={item.domain.id}
              domainData={item}
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
