import './index.css'

import { useFetchDecisionList } from '~/api/decision/fetch-list'
import { List } from '~/entities/decision/ui/item'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'

export default function DecisionPage(): JSX.Element {
  const fetcher = useFetchDecisionList({ page: 1, limit: 30 })

  return (
    <main className='DecisionListPage'>
      <Link to={routes.decisionCreate.getURL()}>Создать</Link>
      <List className='decisionList' list={fetcher.data?.items || []} />
    </main>
  )

  // Private
}
