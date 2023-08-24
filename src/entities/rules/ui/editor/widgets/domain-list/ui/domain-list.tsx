import './domain-list.css'

import { DomainRes } from '~/entities/rules/types/rules-type'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import { themes } from '../../rules/themes'
import { Domain } from '../widgets/domain'
import InputSearch from '../widgets/input-search'

interface DomainListProps {
  domains: DomainRes[]
  defaultExpanded?: boolean | undefined
  rootProps?: React.HTMLAttributes<HTMLDListElement>
}

DomainList.displayName = 'e-Rules-ui-DomainList'

emitter.emit('addTheme', themes)

export function DomainList(props: DomainListProps): JSX.Element {
  const { domains, defaultExpanded, rootProps } = props

  return (
    <>
      <InputSearch rootProps={{ style: { marginBottom: '25px' } }} />
      <ul className={c(DomainList.displayName, rootProps?.className)} {...rootProps}>
        {domains.map((item) => {
          return <Domain key={item.id} domain={item} defaultExpanded={!!defaultExpanded} />
        })}
      </ul>
    </>
  )
}
