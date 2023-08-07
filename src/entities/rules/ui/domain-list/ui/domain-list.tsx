import './domain-list.css'

import { c } from '~/utils/core'
import { DomainItemProps } from '~/entities/rules/types/rules-type'
import { Domain } from '../widgets/domain'
import InputSearch from '../widgets/input-search'

interface DomainListProps {
  domains: DomainItemProps[]
  defaultExpanded?: boolean | undefined
  rootProps?: React.HTMLAttributes<HTMLDListElement>
}

DomainList.displayName = 'e-Rules-ui-DomainList'

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
