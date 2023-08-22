import './editor.css'

import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { addDataMentions } from '~/entities/rules/lib/add-data-mentions'
import { mentionsDataAtom } from '~/entities/rules/models/mentionsData'
import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { c } from '~/utils/core'

import { DomainList } from '../widgets/domain-list'
import { Rules } from '../widgets/rules'

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
