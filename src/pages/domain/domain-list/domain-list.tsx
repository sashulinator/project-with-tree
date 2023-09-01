import { useState } from 'react'

import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { AddDomain } from '~/entities/domain/ui/add-domain'
import { Domain } from '~/entities/domain/ui/domain-item'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [isAddDomainActive, setAddDomainActive] = useState(false)
  const [parentId, setParentId] = useState('')
  return (
    <>
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {isAddDomainActive && <AddDomain parentId={parentId} handleModalClose={handleModalClose} />}
        {fetcher.isSuccess &&
          fetcher.data.items.map((item) => (
            <Domain handleModalOpen={handleModalOpen} key={item.domain.id} domainData={item} />
          ))}
      </main>
    </>
  )

  // Private
  function handleModalOpen(id: string): void {
    setParentId(id)
    setAddDomainActive(true)
  }
  function handleModalClose(): void {
    setAddDomainActive(false)
    setParentId('')
  }
}
