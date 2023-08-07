import './create.css'

import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { DomainList } from '../../domain-list'
import InputSearch from '../../domain-list/widgets/input-search'
import { Editor } from '../../editor'

interface AddRulesProps {
  dataList: DomainItemProps[]
}

export function Create(props: AddRulesProps): JSX.Element {
  const { dataList } = props
  return (
    <main className='e-ui-Rules-Create'>
      <nav className='list'>
        <InputSearch rootProps={{ style: { marginBottom: '25px' } }} />
        <DomainList domains={dataList} defaultExpanded={true} />
      </nav>

      <Editor />
    </main>
  )
}
