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

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { RuleContainer, RuleItem } from '~/entities/rule-test'
import { EditorValues, MentionsItem, SelectValue } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id, c, generateId } from '~/utils/core'

import Container from './widget/container/ui/container'
import Item from './widget/container/widget/item/ui/item'

Editor.displayName = 'e-Rule-Editor'

export interface Props {
  initialData: EditorValues[]
  dataList: ParentDomainRes[]
}

function Editor(props: Props): JSX.Element {
  const { initialData, dataList } = props

  const newContainerList = initialData.map((item) => {
    return { id: item.id }
  })

  const newRulesList: RuleItem[] = []
  initialData.forEach((arr) => {
    arr.valueArr.forEach((item) => {
      newRulesList.push({ id: item.id, value: item.value, containerId: arr.id, condition: item.condition })
    })
  })

  const [mentionsData, setMentionsData] = useState(addDataMentions(dataList))

  useEffect(() => setMentionsData(addDataMentions(dataList)), [dataList])

  const [containerList, setActiveContainerList] = useState<RuleContainer[]>(newContainerList)
  const [activeContainer, setActiveContainer] = useState<RuleContainer | null>(null)
  const columnsId = useMemo(() => containerList.map((item) => item.id), [containerList])

  const [rules, setRules] = useState<RuleItem[]>(newRulesList)
  const [activeItem, setActiveItem] = useState<RuleItem | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <div className={c(Editor.displayName)}>
        <Flex gap='xxxl' dir='column'>
          <GhostButton onClick={createContainer}>
            <Flex gap='l' crossAxis='center'>
              <Plus></Plus>
              Добавить контейнер
            </Flex>
          </GhostButton>
          <SortableContext items={columnsId}>
            {containerList.map((item) => (
              <Container
                rules={rules}
                key={item.id}
                container={item}
                rulesForContainer={rules.filter((rule) => rule.containerId === item.id)}
                deleteRule={deleteRule}
                createRule={createRule}
                deleteContainer={deleteContainer}
                setRules={setRules}
                mentionsData={mentionsData}
              />
            ))}
          </SortableContext>
        </Flex>
      </div>
      {createPortal(
        <DragOverlay>
          {activeContainer && (
            <Container
              rules={rules}
              rulesForContainer={rules.filter((rule) => rule.containerId === activeContainer.id)}
              container={activeContainer}
            />
          )}
          {activeItem && <Item showSelect={false} rule={activeItem} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
  // test

  function addDataMentions(arr: ParentDomainRes[]): MentionsItem[] {
    let result: MentionsItem[] = []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    arr.forEach(({ domain, attributes, childDomains }) => {
      result.push({ id: `domain, ${domain.id}`, display: domain.name })
      attributes.forEach(({ id, name }) => {
        result.push({ id: `attribute, ${id}`, display: name })
      })
      if (childDomains.length > 0) {
        result = [...result, ...addDataMentions(childDomains)]
      }
    })
    return result
  }

  // Private

  function onDragStart(e: DragStartEvent): void {
    if (e.active.data.current?.type === 'Container') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveContainer(e.active.data.current.container)
    }

    if (e.active.data.current?.type === 'RuleItem') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveItem(e.active.data.current.rule)
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
      setRules((rules) => {
        const activeIndex = rules.findIndex((t) => t.id === activeId)
        const overIndex = rules.findIndex((t) => t.id === overId)

        const rulesOverCondition = rules[overIndex].condition
        const rulesActiveCondition = rules[activeIndex].condition

        rules[overIndex].condition = rulesActiveCondition
        rules[activeIndex].condition = rulesOverCondition
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
      setRules((rules) => {
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

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveAContainer = active.data.current?.type === 'Container'

    if (!isActiveAContainer) return

    setActiveContainerList((containerList) => {
      const activeContainerIndex = containerList.findIndex((item) => item.id === activeId)

      const overContainerIndex = containerList.findIndex((item) => item.id === overId)

      return arrayMove(containerList, activeContainerIndex, overContainerIndex)
    })
  }

  function createContainer(): void {
    const containerToAdd: RuleContainer = { id: generateId() }
    setActiveContainerList((containerList) => [...containerList, containerToAdd])
  }

  function deleteContainer(id: Id): void {
    setActiveContainerList((containerList) => containerList.filter((item) => item.id !== id))

    const newTask = rules.filter((t) => t.containerId !== id)
    setRules(newTask)
  }

  function createRule(containerId: Id): void {
    const newTask: RuleItem = {
      id: generateId(),
      containerId,
      value: '',
      condition: SelectValue.and,
    }

    setRules([...rules, newTask])
  }

  function deleteRule(id: Id): void {
    setRules((rules) => rules.filter((item) => item.id !== id))
  }
}

export default Editor
