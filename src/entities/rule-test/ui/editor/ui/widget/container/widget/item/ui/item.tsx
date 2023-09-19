/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './item.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useState } from 'react'

import { RuleItem } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { Id, c } from '~/utils/core'

interface Props {
  rule: RuleItem
  deleteRule?: (id: Id) => void
}

Item.displayName = 'e-Rule-Editor-w-Item'

function Item(props: Props): JSX.Element {
  const { rule, deleteRule = (): void => {} } = props
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: rule.id,
    data: {
      type: 'RuleItem',
      task: rule,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={{ ...style, opacity: 0.6 }} className={c(Item.displayName)}></div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={(): void => setMouseIsOver(true)}
      onMouseLeave={(): void => setMouseIsOver(false)}
      className={c(Item.displayName)}
    >
      {rule.content}
      {mouseIsOver && (
        <GhostButton square onClick={(): void => deleteRule(rule.id)}>
          <Close />
        </GhostButton>
      )}
    </div>
  )
}

export default Item
