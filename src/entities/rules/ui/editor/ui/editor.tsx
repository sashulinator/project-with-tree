import './editor.css'

import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { DomainList } from '../widgets/domain-list'
import { Rules } from '../widgets/rules'
import { c } from '~/utils/core'
import { useSetRecoilState } from 'recoil'
import { mentionsDataAtom } from '~/entities/rules/models/mentionsData'
import { addDataMentions } from '~/entities/rules/lib/add-data-mentions'
import { useEffect } from 'react'

Editor.displayName = 'ruleEditor'

interface AddRulesProps {
  dataList: DomainItemProps[]
  className?: string
}

export function Editor(props: AddRulesProps): JSX.Element {
  const { dataList } = props

  const setMentionsData = useSetRecoilState(mentionsDataAtom)

  useEffect(() => setMentionsData(addDataMentions(dataList)), [dataList])

  return (
    <div className={c(props.className, Editor.displayName)}>
      <div className='list'>
        <DomainList domains={dataList} defaultExpanded={true} />
      </div>
      <Rules />
    </div>
  )
}
