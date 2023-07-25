import { DomainItemProps } from '../../types/rules-type'
import { DomainItem } from '../domain-item'

interface DomainListProps {
  rules: DomainItemProps[]
  defaultExpanded?: boolean | undefined
}

export default function DomainList(props: DomainListProps): JSX.Element {
  const { rules, defaultExpanded } = props

  return (
    <>
      {rules.map((item) => {
        return <DomainItem key={item.id} domain={item} defaultExpanded={!!defaultExpanded} />
      })}
    </>
  )
}
