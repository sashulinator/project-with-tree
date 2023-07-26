import CollapseUI from '~/ui/collapse/ui/collapse'
import { DomainItemProps } from '../../types/rules-type'
import { memo } from 'react'
import { useSetRecoilState } from 'recoil'
import { draggableCardAtom } from '../../state/state'
import { Attribute } from '../attribute/attribute'

import './domain-item.css'
interface DomainProps {
  domain: DomainItemProps
  defaultExpanded?: boolean
  defaultChildExpanded?: boolean
  pl?: number
}

function DomainItemComponent({ domain, pl = 0, defaultChildExpanded, ...props }: DomainProps): JSX.Element {
  const pLeft = pl

  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: domain.domainNodeType, name: domain.domainName })
  }

  return (
    <div draggable onDragStart={dragStart}>
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
    </div>
  )
}

export const DomainItem = memo(DomainItemComponent)
