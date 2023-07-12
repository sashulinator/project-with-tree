import { RulesItem } from '../../types/rules-type'
import CollapseRules from '../collapse-rules/collapse-rules'

interface domain {
  domain: RulesItem
  isExpanded: boolean
  ml?: number
}

export default function DomainItem({ domain, isExpanded, ml = 0 }: domain): JSX.Element {
  const mlTest = ml

  return (
    <>
      <CollapseRules key={domain.id} title={domain.domainName} isExpanded={isExpanded} ml={mlTest}>
        {domain.attributes.length > 0 ? (
          <ul>
            {domain.attributes.map((attribute) => (
              <li key={attribute.id}>{attribute.name}</li>
            ))}
          </ul>
        ) : (
          <div>Нет атрибутов...</div>
        )}
      </CollapseRules>
      {domain.childDomain !== null &&
        domain.childDomain.map((item) => (
          <DomainItem key={item.id} domain={item} isExpanded={false} ml={mlTest + 20} />
        ))}
    </>
  )
}
