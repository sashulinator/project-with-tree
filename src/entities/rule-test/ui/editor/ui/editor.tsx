/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import './editor.css'

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
import { RuleContainer, RuleItem } from '~/entities/rule-test'
import { GhostButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id, c, generateId } from '~/utils/core'

import Container from './widget/container/ui/container'
import Item from './widget/container/widget/item/ui/item'

Editor.displayName = 'e-Rule-Editor'

export interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Editor(props: Props): JSX.Element {
  const [containerList, setActiveContainerList] = useState<RuleContainer[]>([])
  const [activeContainer, setActiveContainer] = useState<RuleContainer | null>(null)
  const columnsId = useMemo(() => containerList.map((item) => item.id), [containerList])

  const [rules, setTasks] = useState<RuleItem[]>([])
  const [activeItem, setActiveItem] = useState<RuleItem | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )
  console.log(activeContainer)
  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <div className={c(Editor.displayName)}>
        <Flex gap='xxxl' dir='column' crossAxis='center'>
          <GhostButton square onClick={createContainer}>
            <Plus></Plus>
          </GhostButton>
          <SortableContext items={columnsId}>
            {containerList.map((item) => (
              <Container
                key={item.id}
                container={item}
                rules={rules.filter((task) => task.containerId === item.id)}
                deleteRule={deleteRule}
                createRule={createRule}
                deleteContainer={deleteContainer}
              />
            ))}
          </SortableContext>
        </Flex>
      </div>
      {createPortal(
        <DragOverlay>
          {activeContainer && (
            <Container
              deleteRule={deleteRule}
              createRule={createRule}
              deleteContainer={deleteContainer}
              rules={rules.filter((task) => task.containerId === activeContainer.id)}
              container={activeContainer}
            />
          )}
          {activeItem && <Item rule={activeItem} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )

  function onDragStart(e: DragStartEvent): void {
    if (e.active.data.current?.type === 'Container') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveContainer(e.active.data.current.container)
    }

    if (e.active.data.current?.type === 'RuleItem') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveItem(e.active.data.current.task)
      return
    }
  }

  function onDragOver(event: DragOverEvent): void {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'RuleItem'
    const isOverATask = over.data.current?.type === 'RuleItem'

    if (!isActiveATask) return

    // Im dropping a RuleItem over another RuleItem
    if (isActiveATask && isOverATask) {
      setTasks((rules) => {
        const activeIndex = rules.findIndex((t) => t.id === activeId)
        const overIndex = rules.findIndex((t) => t.id === overId)

        if (rules[activeIndex].containerId != rules[overIndex].containerId) {
          rules[activeIndex].containerId = rules[overIndex].containerId
          return arrayMove(rules, activeIndex, overIndex - 1)
        }

        return arrayMove(rules, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Container'

    // Im dropping a RuleItem over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((rules) => {
        const activeIndex = rules.findIndex((t) => t.id === activeId)

        rules[activeIndex].containerId = overId
        return arrayMove(rules, activeIndex, activeIndex)
      })
    }
  }

  function onDragEnd(event: DragEndEvent): void {
    setActiveContainer(null)
    setActiveItem(null)

    const { active, over } = event

    console.log('active', active)
    console.log('over', over)
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAContainer = active.data.current?.type === 'Container'
    console.log('isActiveAContainer', active.data.current?.type)
    if (!isActiveAContainer) return

    setActiveContainerList((containerList) => {
      const activeContainerIndex = containerList.findIndex((item) => item.id === activeId)

      const overContainerIndex = containerList.findIndex((item) => item.id === overId)

      return arrayMove(containerList, activeContainerIndex, overContainerIndex)
    })
  }

  function createContainer(): void {
    const containerToAdd: RuleContainer = { id: generateId(), title: `Container ${containerList.length + 1}` }
    setActiveContainerList((containerList) => [...containerList, containerToAdd])
  }

  function deleteContainer(id: Id): void {
    setActiveContainerList((containerList) => containerList.filter((item) => item.id !== id))

    const newTask = rules.filter((t) => t.containerId !== id)
    setTasks(newTask)
  }

  function createRule(containerId: Id): void {
    const newTask: RuleItem = {
      id: generateId(),
      containerId,
      content: `RuleItem ${rules.length + 1}`,
    }

    setTasks([...rules, newTask])
  }

  function deleteRule(id: Id): void {
    setTasks((rules) => rules.filter((item) => item.id !== id))
  }
}

export default Editor
