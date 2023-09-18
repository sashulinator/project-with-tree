/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './index.css'

import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useMemo } from 'react'

import { GhostButton } from '~/ui/button'
import { Close, Plus } from '~/ui/icon'
import { Id, c } from '~/utils/core'

import TaskCard from './task-card'
import { Column, Task } from './type'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  createTask: (id: Id) => void
  deleteTask: (id: Id) => void
  tasks: Task[]
}

ColumnContainer.displayName = 'ColumnContainer'

function ColumnContainer(props: Props): JSX.Element {
  const tasksIds = useMemo(() => {
    return props.tasks.map((task) => task.id)
  }, [props.tasks])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: props.column.id,
    data: {
      type: 'Column',
      column: props.column,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return <div style={{ ...style, opacity: 0.6 }} ref={setNodeRef} className={c(ColumnContainer.displayName)}></div>
  }

  return (
    <div style={style} ref={setNodeRef} className={c(ColumnContainer.displayName)}>
      <div {...attributes} {...listeners} className='header'>
        <h2>{props.column.title}</h2>
        <GhostButton square onClick={(): void => props.deleteColumn(props.column.id)}>
          <Close />
        </GhostButton>
      </div>
      <div className='body'>
        <GhostButton square onClick={(): void => props.createTask(props.column.id)}>
          <Plus></Plus>
        </GhostButton>
        <SortableContext items={tasksIds}>
          {props.tasks.map((item) => (
            <TaskCard deleteTask={props.deleteTask} key={item.id} card={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default ColumnContainer
