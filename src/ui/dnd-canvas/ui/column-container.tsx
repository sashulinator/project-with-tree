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
  tasks: Task[]
  deleteColumn?: (id: Id) => void
  createTask?: (id: Id) => void
  deleteTask?: (id: Id) => void
}

ColumnContainer.displayName = 'ColumnContainer'

function ColumnContainer(props: Props): JSX.Element {
  const {
    column,
    tasks,
    deleteColumn = (): void => {},
    createTask = (): void => {},
    deleteTask = (): void => {},
  } = props

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column: column,
    },
  })
  console.log('task', tasks)
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
        <h2>{column.title}</h2>
        <GhostButton square onClick={(): void => deleteColumn(column.id)}>
          <Close />
        </GhostButton>
      </div>
      <div className='body'>
        <GhostButton square onClick={(): void => createTask(column.id)}>
          <Plus></Plus>
        </GhostButton>
        <SortableContext items={tasksIds}>
          {tasks.map((item) => (
            <TaskCard deleteTask={deleteTask} key={item.id} card={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default ColumnContainer
