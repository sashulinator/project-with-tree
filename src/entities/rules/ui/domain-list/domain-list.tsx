import { c } from '~/utils/core'
import { DomainItemProps } from '../../types/rules-type'
import { DomainItem } from '../domain-item/domain-item'
import './domain-list.css'
interface DomainListProps {
  domains: DomainItemProps[]
  defaultExpanded?: boolean | undefined
  rootProps?: React.HTMLAttributes<HTMLDListElement>
}

DomainList.displayName = 'e-Rules-ui-DomainList'

export function DomainList(props: DomainListProps): JSX.Element {
  const { domains, defaultExpanded, rootProps } = props

  return (
    <ul className={c(DomainList.displayName, rootProps?.className)} {...rootProps}>
      {domains.map((item) => {
        return <DomainItem key={item.id} domain={item} defaultExpanded={!!defaultExpanded} />
      })}
    </ul>
  )
}
