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
import Scrollbars from 'react-custom-scrollbars'
import { createPortal } from 'react-dom'

import Flex from '~/abstract/flex'
import { ParentDomainRes } from '~/api/domain/types/parent-domain-res'
import { Attribute } from '~/entities/attribute'
import { RuleContainer, RuleItem } from '~/entities/rule-test'
import { EditorValues, MentionsItem, SelectValue } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id, c, generateId } from '~/utils/core'

import Container from './widget/container/ui/container'
import Item from './widget/container/widget/item/ui/item'
import DomainList from './widget/domain-list/ui/domain-list'
import DomainItem from './widget/domain-list/widget/domain-item/ui/domain-item'
import AttributeItem from './widget/domain-list/widget/domain-item/widget/attribute-item/ui/attribute-item'

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
  const [activeDomain, setActiveDomain] = useState<ParentDomainRes | null>(null)
  const [activeAttribute, setActiveAttribute] = useState<Attribute | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <Flex gap='xxxl' mainAxis='space-between' width='100%' padding='20px'>
        <nav
          className='list'
          style={{
            borderRight: '1px solid var(--bgSecondary)',
            height: 'calc(100vh - var(--header-height) * 1px)',
            width: '400px',
          }}
        >
          <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={500}>
            <DomainList list={dataList} />
          </Scrollbars>
        </nav>
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
      </Flex>

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
          {activeDomain && <DomainItem domainData={activeDomain} />}
          {activeAttribute && <AttributeItem attribute={activeAttribute} />}
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

    if (e.active.data.current?.type === 'Attribute') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveAttribute(e.active.data.current.attribute)
      return
    }

    if (e.active.data.current?.type === 'Domain') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setActiveDomain(e.active.data.current.domain)
      return
    }
  }

  function onDragOver(event: DragOverEvent): void {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id
    // Потом добавить ховер стили
    // if (
    //   (active.data.current?.type === 'Domain' || active.data.current?.type === 'Attribute') &&
    //   over.data.current?.type === 'RuleItem'
    // ) {
    //   console.log(active.data.current)
    //   console.log(over.data.current)
    // }

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
    setActiveAttribute(null)
    setActiveDomain(null)

    const { active, over } = event

    if (!over) return

    const ActiveData = active.data.current
    const OverData = over.data.current

    const activeId = active.id
    const overId = over.id

    if (ActiveData?.type === 'Domain' && OverData?.type === 'RuleItem') {
      setRules((rules) =>
        rules.map((item) => {
          if (item.id === overId) {
            return {
              ...item,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              value: `${item.value}@[${ActiveData.domain.domain.name}](domain, ${ActiveData.domain.domain.id})`,
            }
          }
          return item
        })
      )
    } else if (ActiveData?.type === 'Attribute' && OverData?.type === 'RuleItem') {
      setRules((rules) =>
        rules.map((item) => {
          if (item.id === overId) {
            return {
              ...item,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              value: `${item.value}@[${ActiveData.attribute.name}](attribute, ${ActiveData.attribute.id})`,
            }
          }
          return item
        })
      )
    }

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
