import CollapseUI from '~/ui/collapse/ui/collapse'
import { DomainItemProps } from '../../types/rules-type'
import './domain-item.css'
import { memo } from 'react'
import Attribute from '../attribute/attribute'
interface domain {
  domain: DomainItemProps
  defaultExpanded?: boolean
  defaultChildExpanded?: boolean
  pl?: number
}

function DomainItemComponent({ domain, pl = 0, defaultChildExpanded, ...props }: domain): JSX.Element {
  const pLeft = pl
  console.log(domain.domainName)
  return (
    <>
      <CollapseUI
        defaultExpanded={props.defaultExpanded}
        title={domain.domainName}
        rootProps={{ className: 'DomainItem', style: { paddingLeft: pl } }}
      >
        {domain.attributes.length > 0 ? (
          <ul style={{ padding: '10px' }}>
            {domain.attributes.map((attribute) => (
              <Attribute key={attribute.id} attribute={attribute} />
            ))}
          </ul>
        ) : (
          <div>Нет атрибутов...</div>
        )}
      </CollapseUI>
      {domain.childDomain !== null &&
        domain.childDomain.map((item) => (
          <DomainItem key={item.id} domain={item} defaultExpanded={!!defaultChildExpanded} pl={pLeft + 10} />
        ))}
    </>
  )
}

export const DomainItem = memo(DomainItemComponent)
