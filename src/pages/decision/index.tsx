import './index.css'

import { Link } from 'react-router-dom'

import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import mock1 from '~/mocks/decision/mockId1'
import mock2 from '~/mocks/decision/mockId2'
import { routes } from '~/shared/routes'

export default function DecisionPage(): JSX.Element {
  const decision1 = useFetchDecisionMock({}, { id: mock1.id })
  const decision2 = useFetchDecisionMock({}, { id: mock2.id })

  const listResponse = { items: [decision1.data, decision2.data], total: 2 }

  return (
    <main className='DecisionListPage'>
      <ul>
        {listResponse.items.map((item) => {
          return (
            <li key={item?.id}>
              <Link to={routes.decisionId.path.replace(':id', item?.id.toString() || '')}>{item?.name}</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )

  // Private
}
