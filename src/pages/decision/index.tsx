import { List } from '~/entities/decision/ui/item'
import './index.css'

import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import mock1 from '~/mocks/decision/mockId1'
import mock2 from '~/mocks/decision/mockId2'
import mock3 from '~/mocks/decision/mockId3'
import mock4 from '~/mocks/decision/mockId4'
import mock5 from '~/mocks/decision/mockId5'
import mock6 from '~/mocks/decision/mockId6'
import mock7 from '~/mocks/decision/mockId7'
import mock8 from '~/mocks/decision/mockId8'
import mock9 from '~/mocks/decision/mockId9'
import mock10 from '~/mocks/decision/mockId10'

export default function DecisionPage(): JSX.Element {
  const decision1 = useFetchDecisionMock({}, { id: mock1.id })
  const decision2 = useFetchDecisionMock({}, { id: mock2.id })
  const decision3 = useFetchDecisionMock({}, { id: mock3.id })
  const decision4 = useFetchDecisionMock({}, { id: mock4.id })
  const decision5 = useFetchDecisionMock({}, { id: mock5.id })
  const decision6 = useFetchDecisionMock({}, { id: mock6.id })
  const decision7 = useFetchDecisionMock({}, { id: mock7.id })
  const decision8 = useFetchDecisionMock({}, { id: mock8.id })
  const decision9 = useFetchDecisionMock({}, { id: mock9.id })
  const decision10 = useFetchDecisionMock({}, { id: mock10.id })

  const listResponse =
    decision1.data &&
    decision2.data &&
    decision3.data &&
    decision4.data &&
    decision5.data &&
    decision6.data &&
    decision7.data &&
    decision8.data &&
    decision9.data &&
    decision10.data
      ? {
          items: [
            decision1.data,
            decision2.data,
            decision3.data,
            decision4.data,
            decision5.data,
            decision6.data,
            decision7.data,
            decision8.data,
            decision9.data,
            decision10.data,
          ],
          total: 2,
        }
      : undefined

  return (
    <main className='DecisionListPage'>
      <List className='decisionList' list={listResponse?.items || []} />
    </main>
  )

  // Private
}
