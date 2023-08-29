import './index.css'

import Flex from '~/abstract/flex/ui/flex'
import { useFetchDecisionList } from '~/api/decision/fetch-list'
import { useRemoveDecision } from '~/api/decision/remove'
import { List } from '~/entities/decision/ui/item'
import { notify } from '~/shared/notify'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import { Id } from '~/utils/core'

export default function DecisionPage(): JSX.Element {
  const fetcher = useFetchDecisionList({ page: 1, limit: 30 })
  const removeMutator = useRemoveDecision({
    onSuccess: () => {
      notify({ data: 'Удалено', type: 'success' })
      void fetcher.refetch()
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main className='DecisionListPage'>
      <Flex margin='0 0 var(--xxl)'>
        <Link to={routes.decisionCreate.getURL()}>Создать</Link>
      </Flex>
      <List className='decisionList' list={fetcher.data?.items || []} remove={remove} />
    </main>
  )

  // Private

  function remove(id: Id): void {
    removeMutator.mutate({ id })
  }
}
