import { DomainItemProps } from '../../types/rules-type'
import { DomainItem } from '../domain-item/domain-item'

interface DomainListProps {
  domains: DomainItemProps[]
  defaultExpanded?: boolean | undefined
}

export function DomainList(props: DomainListProps): JSX.Element {
  const { domains, defaultExpanded } = props

  return (
    <>
      {domains.map((item) => {
        return <DomainItem key={item.id} domain={item} defaultExpanded={!!defaultExpanded} />
      })}
    </>
  )
}
