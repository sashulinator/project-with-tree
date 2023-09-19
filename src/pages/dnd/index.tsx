import './index.css'

import { RuleEditor } from '~/entities/rule-test'

DndPage.displayName = 'DndPage'

function DndPage(): JSX.Element {
  return (
    <main className={DndPage.displayName}>
      <RuleEditor />
    </main>
  )
}

export default DndPage
