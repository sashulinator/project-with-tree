/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './container.css'

import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useMemo } from 'react'

import { RuleContainer, RuleItem } from '~/entities/rule-test/types/type'
import { GhostButton } from '~/ui/button'
import { Close, Plus } from '~/ui/icon'
import { Id, c } from '~/utils/core'

import Item from '../widget/item/ui/item'

interface Props {
  container: RuleContainer
  rules: RuleItem[]
  deleteContainer?: (id: Id) => void
  createRule?: (id: Id) => void
  deleteRule?: (id: Id) => void
}

Container.displayName = 'e-Rule-Editor-Container'

function Container(props: Props): JSX.Element {
  const {
    container,
    rules,
    deleteContainer = (): void => {},
    createRule = (): void => {},
    deleteRule = (): void => {},
  } = props

  const rulesIds = useMemo(() => {
    return rules.map((task) => task.id)
  }, [rules])

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

  if (isDragging) {
    return <div style={{ ...style, opacity: 0.6 }} ref={setNodeRef} className={c(Container.displayName)}></div>
  }

  return (
    <div style={style} ref={setNodeRef} className={c(Container.displayName)}>
      <div {...attributes} {...listeners} className='header'>
        <h2>{container.title}</h2>
        <GhostButton square onClick={(): void => deleteContainer(container.id)}>
          <Close />
        </GhostButton>
      </div>
      <div className='body'>
        <GhostButton square onClick={(): void => createRule(container.id)}>
          <Plus></Plus>
        </GhostButton>
        <SortableContext items={rulesIds}>
          {rules.map((item) => (
            <Item deleteRule={deleteRule} key={item.id} rule={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default Container
