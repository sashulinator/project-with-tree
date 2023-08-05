import './domain.css'
import CollapseUI from '~/ui/collapse/ui/collapse'
import { memo } from 'react'
import { useSetRecoilState } from 'recoil'
import { ChildDomain } from '~/entities/rules/types/rules-type'
import Attribute from '../../attribute'
import { draggableCardAtom } from '~/entities/rules/models'

interface DomainProps {
  domain: ChildDomain
  defaultExpanded?: boolean
  defaultChildExpanded?: boolean
  pl?: number
}

function DomainComponent({ domain, pl = 0, defaultChildExpanded, ...props }: DomainProps): JSX.Element {
  const pLeft = pl

  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: domain.domainNodeType, name: domain.domainName })
  }

  return (
    <div className='e-Rules-ui-DomainList-Item' draggable onDragStart={dragStart}>
      <CollapseUI
        defaultExpanded={props.defaultExpanded}
        title={domain.domainName}
        rootProps={{ style: { paddingLeft: pl, marginBottom: '10px', backgroundColor: 'white' } }}
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
          <Domain key={item.id} domain={item} defaultExpanded={!!defaultChildExpanded} pl={pLeft + 10} />
        ))}
    </div>
  )
}

export const Domain = memo(DomainComponent)
