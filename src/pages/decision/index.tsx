import './index.css'

import { useFetchDecisionList } from '~/api/decision/fetch-list'
import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import { List } from '~/entities/decision/ui/item'

export default function DecisionPage(): JSX.Element {
  // const fetcher = useFetchDecisionList({ page: 1, limit: 30 })
  const fetcher = useFetchDecisionMock({ id: 1 })

  return (
    <main className='DecisionListPage'>
      <List className='decisionList' list={(fetcher.data && [fetcher.data]) || []} />
    </main>
  )

  // Private
}
