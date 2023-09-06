import './domain.css'

import { memo } from 'react'
import { useSetRecoilState } from 'recoil'

import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { draggableCardAtom } from '~/entities/rule/models/draggableCard'
import { ChevronAccordion } from '~/ui/accordion'

import Attribute from '../../attribute'

interface DomainProps {
  parentDomain: ParentDomainRes
  defaultExpanded?: boolean
  pl?: number
}

function DomainComponent({ parentDomain, pl = 0, ...props }: DomainProps): JSX.Element {
  const pLeft = pl

  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: parentDomain.domain.id, name: parentDomain.domain.name, type: 'domain' })
  }

  return (
    <div className='e-Rules-ui-DomainList-Item' draggable onDragStart={dragStart}>
      <ChevronAccordion
        header={parentDomain.domain.name}
        defaultExpanded={props.defaultExpanded}
        rootProps={{ style: { paddingLeft: pl, marginBottom: '10px' } }}
      >
        {parentDomain.attributes.length > 0 ? (
          <ul style={{ padding: '10px' }}>
            {parentDomain.attributes.map((attribute) => (
              <Attribute key={attribute.id} attribute={attribute} />
            ))}
          </ul>
        ) : (
          <div>Нет атрибутов...</div>
        )}
      </ChevronAccordion>

      {parentDomain.childDomains.length > 0 &&
        parentDomain.childDomains.map((item) => (
          <Domain key={item.domain.id} parentDomain={item} defaultExpanded={true} pl={pLeft + 10} />
        ))}
    </div>
  )
}

export const Domain = memo(DomainComponent)
