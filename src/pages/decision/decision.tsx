import './decision.css'

import { decision } from '~/entities/decision/mock'
import { ruleList } from '~/mocks/rule-list'
import { ThemeDropdown } from '~/widgets/theme'

import { Editor } from '../../entities/decision/ui/editor'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  return (
    <main className='DecisionPage'>
      <ThemeDropdown />
      <Editor decision={decision} ruleList={ruleList} />
    </main>
  )

  // Private
}
