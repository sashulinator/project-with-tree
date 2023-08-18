import './index.css'

import { useFetchDecisionList } from '~/api/decision/fetch-list'
import { List } from '~/entities/decision/ui/item'

export default function DecisionPage(): JSX.Element {
  const fetcher = useFetchDecisionList({ page: 1, limit: 10 })

  return (
    <main className='DecisionListPage'>
      <List className='decisionList' list={fetcher.data || []} />
    </main>
  )

  // Private
}
