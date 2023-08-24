import './domain.css'

import { memo } from 'react'
import { useSetRecoilState } from 'recoil'

import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { DomainRes } from '~/entities/rules/types/rules-type'
import CollapseUI from '~/ui/collapse/ui/collapse'

import Attribute from '../../attribute'

interface DomainProps {
  domain: DomainRes
  defaultExpanded?: boolean

  pl?: number
}

function DomainComponent({ domain, pl = 0, ...props }: DomainProps): JSX.Element {
  // const pLeft = pl

  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: domain.id, name: domain.name, type: 'domain' })
  }

  return (
    <div className='e-Rules-ui-DomainList-Item' draggable onDragStart={dragStart}>
      <CollapseUI
        defaultExpanded={props.defaultExpanded}
        title={domain.name}
        rootProps={{ style: { paddingLeft: pl, marginBottom: '10px' } }}
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

      {/*
      // Не удалять! 
      {domain.childDomain !== null &&
        domain.childDomain.map((item) => (
          <Domain key={item.id} domain={item} defaultExpanded={!!defaultChildExpanded} pl={pLeft + 10} />
        ))} */}
    </div>
  )
}

export const Domain = memo(DomainComponent)
