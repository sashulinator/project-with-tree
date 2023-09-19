import './index.css'

import { RuleEditor } from '~/entities/rule-test'

DndPage.displayName = 'DndPage'

export enum SelectValue {
  and = 'and',
  or = 'or',
  not = 'not',
  xor = 'xor',
}

export type EditorItem = {
  id: string
  value: string
  condition: SelectValue
}

export type EditorValues = {
  id: string
  valueArr: EditorItem[]
  condition: SelectValue
}

export const data: EditorValues[] = [
  {
    id: '5',
    valueArr: [{ id: '3', value: '', condition: SelectValue.and }],
    condition: SelectValue.and,
  },
]

function DndPage(): JSX.Element {
  return (
    <main className={DndPage.displayName}>
      <RuleEditor initialData={data} />
    </main>
  )
}

export default DndPage
