/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import Flex from '~/abstract/flex'
import { GhostButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id, c, generateId } from '~/utils/core'

import ColumnContainer from './column-container'
import TaskCard from './task-card'
import { Column, Task } from './type'

DndCanvas.displayName = 'ui-DndCanvas'

function DndCanvas(): JSX.Element {
  const [columns, setColumns] = useState<Column[]>([])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  console.log(columns)
  const columnsId = useMemo(() => columns.map((item) => item.id), [columns])

  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <div className={c(DndCanvas.name)}>
        <Flex gap='xxxl' dir='column' crossAxis='center'>
          <GhostButton square onClick={createColumn}>
            <Plus></Plus>
          </GhostButton>
          <SortableContext items={columnsId}>
            {columns.map((item) => (
              <ColumnContainer
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === item.id)}
                createTask={createTask}
                deleteColumn={deleteColumn}
                column={item}
                key={item.id}
              />
            ))}
          </SortableContext>
        </Flex>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer tasks={tasks.filter((task) => task.columnId === activeColumn.id)} column={activeColumn} />
          )}
          {activeTask && <TaskCard card={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )

  function onDragStart(e: DragStartEvent): void {
    if (e.active.data.current?.type === 'Column') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveColumn(e.active.data.current.column)
    }

    if (e.active.data.current?.type === 'Task') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveTask(e.active.data.current.task)
      return
    }
  }

  function onDragOver(event: DragOverEvent): void {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId
        console.log('DROPPING TASK OVER COLUMN', { activeIndex })
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  function onDragEnd(event: DragEndEvent): void {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    console.log('DRAG END')

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function createColumn(): void {
    const columnToAdd: Column = { id: generateId(), title: `Column ${columns.length + 1}` }
    setColumns((columns) => [...columns, columnToAdd])
  }

  function deleteColumn(id: Id): void {
    const filterColumn = columns.filter((col) => col.id !== id)
    setColumns(filterColumn)

    const newTask = tasks.filter((t) => t.columnId !== id)
    setTasks(newTask)
  }

  function createTask(columnId: Id): void {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id: Id): void {
    setTasks((tasks) => tasks.filter((item) => item.id !== id))
  }
}

export default DndCanvas
