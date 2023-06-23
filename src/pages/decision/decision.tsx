import './decision.css'

import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import { ruleList } from '~/mocks/deprecated/rule-list'
import ThemeDropdown from '~/ui/theme-dropdown'

import { Editor } from '../../entities/decision/ui/editor'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const decision = useFetchDecisionMock({}, { id: 'mockId1' })

  return (
    <main className='DecisionPage'>
      <div className='tools'>
        <ThemeDropdown />
      </div>
      {decision.data && <Editor decision={decision.data} ruleList={ruleList} />}
    </main>
  )

  // Private
}
