import './editor.css'

import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { DomainList } from '~/entities/domain'
import { addDataMentions } from '~/entities/rule/lib/add-data-mentions'
import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import { mentionsDataAtom } from '~/entities/rule/models/mentionsData'
import { RulesRes } from '~/entities/rule/types/rules-type'
import { c } from '~/utils/core'

import { Rules } from '../widgets/rules'

Editor.displayName = 'ruleEditor'

interface AddRulesProps {
  dataList: ParentDomainRes[]
  onSubmit: (editorValue: EditorValues[], title: string) => void
  className?: string
  rule: RulesRes | null
}

export function Editor(props: AddRulesProps): JSX.Element {
  const { dataList, onSubmit, rule } = props

  const setMentionsData = useSetRecoilState(mentionsDataAtom)

  useEffect(() => setMentionsData(addDataMentions(dataList)), [dataList])

  return (
    <div className={c(props.className, Editor.displayName)}>
      <div className='list'>
        <DomainList list={dataList} isDraggable={true} />
      </div>
      <Rules rule={rule} onSubmit={onSubmit} />
    </div>
  )
}
