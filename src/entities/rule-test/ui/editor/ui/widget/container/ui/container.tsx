/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './container.css'

import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useMemo } from 'react'

import Flex from '~/abstract/flex'
import { MentionsItem, RuleContainer, RuleItem, SelectValue } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Plus, Trash } from '~/ui/icon'
import { Id, c } from '~/utils/core'

import Item from '../widget/item/ui/item'
import Select from '../widget/item/widget/select'

interface Props {
  container: RuleContainer
  rulesForContainer: RuleItem[]
  rules: RuleItem[]
  deleteContainer?: (id: Id) => void
  createRule?: (id: Id) => void
  deleteRule?: (id: Id) => void
  setRules?: (rulesForContainer: RuleItem[]) => void
  mentionsData?: MentionsItem[]
  showSelect?: boolean
  setActiveContainerList?: (arr: RuleContainer[]) => void
  containerList?: RuleContainer[]
}

Container.displayName = 'e-Rule-Editor-Container'

function Container(props: Props): JSX.Element {
  const {
    container,
    rulesForContainer,
    rules,
    deleteContainer = (): void => {},
    createRule = (): void => {},
    deleteRule = (): void => {},
    setRules = (): void => {},
    mentionsData = [],
    showSelect = true,
    containerList = [],
    setActiveContainerList = (): void => {},
  } = props

  const rulesIds = useMemo(() => {
    return rulesForContainer.map((item) => item.id)
  }, [rulesForContainer])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: container.id,
    data: {
      type: 'Container',
      container: container,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <>
      <div
        {...attributes}
        {...listeners}
        style={{ ...style, opacity: isDragging ? 0.3 : 1 }}
        ref={setNodeRef}
        className={c(Container.displayName)}
      >
        <div className='header'>
          <GhostButton square onClick={(): void => deleteContainer(container.id)}>
            <Trash />
          </GhostButton>
        </div>
        <div className='body'>
          <SortableContext items={rulesIds}>
            {rulesForContainer.map((item, i, arr) => (
              <Item
                mentionsData={mentionsData}
                rules={rules}
                setRules={setRules}
                deleteRule={deleteRule}
                key={item.id}
                rule={item}
                showSelect={i !== arr.length - 1}
              />
            ))}
          </SortableContext>
          <GhostButton onClick={(): void => createRule(container.id)}>
            <Flex gap='l' crossAxis='center'>
              <Plus></Plus>
              Добавить условие
            </Flex>
          </GhostButton>
        </div>
      </div>
      {showSelect && <Select handleChangeSelect={handleChangeSelect} item={container} />}
    </>
  )

  // Private
  function handleChangeSelect(options: SelectValue): void {
    if (containerList) {
      const newContainerList = containerList.map((item) => {
        if (item.id === container.id) return { ...item, condition: options }
        return item
      })
      setActiveContainerList(newContainerList)
    }
  }
}

export default Container
