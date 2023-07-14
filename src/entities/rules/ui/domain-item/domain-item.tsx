import CollapseUI from '~/ui/collapse/ui/collapse'
import { RulesItem } from '../../types/rules-type'
import './domain-item.css'
interface domain {
  domain: RulesItem
  isExpanded: boolean
  pl?: number
}

export default function DomainItem({ domain, isExpanded, pl = 0 }: domain): JSX.Element {
  const pLeft = pl

  return (
    <>
      <CollapseUI isExpanded={isExpanded} title={domain.domainName} rootProps={{ className: 'DomainItem' }} pl={pl}>
        {domain.attributes.length > 0 ? (
          <ul style={{ padding: '10px' }}>
            {domain.attributes.map((attribute) => (
              <p style={{ marginBottom: '10px' }} key={attribute.id}>
                {attribute.name}
              </p>
            ))}
          </ul>
        ) : (
          <div>Нет атрибутов...</div>
        )}
      </CollapseUI>
      {domain.childDomain !== null &&
        domain.childDomain.map((item) => <DomainItem key={item.id} domain={item} isExpanded={false} pl={pLeft + 10} />)}
    </>
  )
}
