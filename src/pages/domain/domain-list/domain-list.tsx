import { useState } from 'react'

import Modal from '~/abstract/modal/ui/modal'
import { useFetchParentDomainList } from '~/api/domain/fetch-parent-domains'
import { Domain } from '~/entities/domain/ui/domain-item'
import { GhostButton } from '~/ui/button'

export default function DomainListPage(): JSX.Element {
  const fetcher = useFetchParentDomainList({ page: 1, limit: 2000 })

  const [isModalActive, setModalActive] = useState(false)

  return (
    <>
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <GhostButton onClick={handleModalOpen}>open modal</GhostButton>
        <div>
          {isModalActive && (
            <Modal title='some modal title' onClose={handleModalClose}>
              Hello world
            </Modal>
          )}
        </div>
        {fetcher.isSuccess && fetcher.data.items.map((item) => <Domain key={item.domain.id} data={item} />)}
      </main>
    </>
  )

  // Private
  function handleModalOpen(): void {
    setModalActive(true)
  }
  function handleModalClose(): void {
    setModalActive(false)
  }
}
