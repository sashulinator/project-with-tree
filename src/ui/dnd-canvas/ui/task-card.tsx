/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import React, { useState } from 'react'

import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { Id, c } from '~/utils/core'

import { Task } from './type'

interface Props {
  card: Task
  deleteTask: (id: Id) => void
}

TaskCard.displayName = 'TaskCard'

function TaskCard(props: Props): JSX.Element {
  const { card, deleteTask } = props
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: 'Task',
      task: card,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={{ ...style, opacity: 0.6 }} className={c(TaskCard.displayName)}></div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={(): void => setMouseIsOver(true)}
      onMouseLeave={(): void => setMouseIsOver(false)}
      className={c(TaskCard.displayName)}
    >
      {card.content}
      {mouseIsOver && (
        <GhostButton square onClick={(): void => deleteTask(card.id)}>
          <Close />
        </GhostButton>
      )}
    </div>
  )
}

export default TaskCard
