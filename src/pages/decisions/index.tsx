import './index.css'

import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { useFetchDecisionList } from '~/api/decision/fetch-list'
import { useRemoveDecision } from '~/api/decision/remove'
import { List } from '~/entities/decision/ui/item'
import { notify } from '~/shared/notify'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import Dialog from '~/ui/modal/variants/dialog/ui/dialog'
import { Id } from '~/utils/core'

export default function DecisionPage(): JSX.Element {
  const fetcher = useFetchDecisionList({ page: 1, limit: 300 }, { staleTime: 1 })
  const removeMutator = useRemoveDecision({
    onSuccess: () => {
      notify({ data: 'Удалено', type: 'success' })
      void fetcher.refetch()
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const [modalDeleteDecision, setModalDeleteDecision] = useState<{ id: Id; name: string } | null>(null)

  return (
    <main className='DecisionListPage'>
      {/* Удаление дерева */}
      <Dialog
        firstFocused={true}
        text={`Вы уверены что хотите удалить дерево: ${modalDeleteDecision?.name}?`}
        onSubmit={remove}
        opened={modalDeleteDecision}
        onDismiss={(): void => setModalDeleteDecision(null)}
      />
      <Flex margin='0 0 var(--xxl)'>
        <Link to={routes.decisionCreate.getURL()}>Создать</Link>
      </Flex>
      <List className='decisionList' list={fetcher.data?.items || []} handleOpenModalRemove={setModalDeleteDecision} />
    </main>
  )

  // Private

  function remove(): void {
    if (modalDeleteDecision) {
      removeMutator.mutate({ id: modalDeleteDecision.id })
      setModalDeleteDecision(null)
    }
  }
}
