import CollapseUI from '~/ui/collapse/ui/collapse'
import { IAttribute, RulesItem } from '../../types/rules-type'
import './domain-item.css'
import Attribute from '../attribute/attribute'
interface domain {
  domain: RulesItem
  defaultExpanded?: boolean
  pl?: number
  activeAttribute: IAttribute | null
  setActiveAttribute: React.Dispatch<React.SetStateAction<IAttribute | null>>
}

export default function DomainItem({
  domain,
  pl = 0,
  activeAttribute,
  setActiveAttribute,
  ...props
}: domain): JSX.Element {
  const pLeft = pl

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
              <Attribute setActiveAttribute={setActiveAttribute} key={attribute.id} attribute={attribute} />
            ))}
          </ul>
        ) : (
          <div>Нет атрибутов...</div>
        )}
      </CollapseUI>
      {domain.childDomain !== null &&
        domain.childDomain.map((item) => (
          <DomainItem
            activeAttribute={activeAttribute}
            setActiveAttribute={setActiveAttribute}
            key={item.id}
            domain={item}
            defaultExpanded={false}
            pl={pLeft + 10}
          />
        ))}
    </>
  )
}
