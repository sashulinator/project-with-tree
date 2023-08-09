import './editor.css'

import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { DomainList } from '../widgets/domain-list'
import { Rules } from '../widgets/rules'

interface AddRulesProps {
  dataList: DomainItemProps[]
}

export function Create(props: AddRulesProps): JSX.Element {
  const { dataList } = props

  return (
    <main className='e-ui-Rules-Create'>
      <nav className='list'>
        <DomainList domains={dataList} defaultExpanded={true} />
      </nav>

      <Rules />
    </main>
  )
}
