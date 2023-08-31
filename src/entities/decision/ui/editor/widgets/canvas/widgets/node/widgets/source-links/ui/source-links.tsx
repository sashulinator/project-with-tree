import './source-links.css'

import type { Identifier, XYCoord } from 'dnd-core'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { UnstyledButton } from '~/abstract/button'
import { Id, c, generateId } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Joint, State } from '../../..'
import { LinkController, LinkListController } from '../../../../../../..'

SourceLinks.displayName = 'decision-Editor-w-Canvas-w-Node-w-SourceLinks'

export interface Props {
  className?: string
  state: State
  linkListController: LinkListController
  hideNewLink?: boolean
  onNewJointClick: (newLinkId: Id) => void
  onJointClick: (linkId: Id) => void
}

export default function SourceLinks(props: Props): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(generateId)

  useUpdate(subscribeOnUpdates)

  const editingLinkState = props.linkListController.findEditingLinkState()
  const isEditingThisNode =
    editingLinkState?.sourceId.value === props.state.id || editingLinkState?.targetId.value === props.state.id
  const isEditingHasSource = Boolean(editingLinkState?.sourceId.value)

  const sourceLinkStates = props.linkListController
    .getLinksBySourceId(props.state.id)
    .sort((a, b) => (a.index.value < b.index.value ? -1 : 1))

  // if (props.state.id === 'id2') {
  //   console.log('isEditingHasSource', isEditingHasSource, editingLinkState)
  // }

  return (
    <div className={c(props.className, SourceLinks.displayName)}>
      {sourceLinkStates.map((linkState, i) => {
        if (linkState.id === newLinkId) return null
        const isLinked = Boolean(linkState.targetId.value)

        return (
          <RuleSet
            index={i}
            linkListController={props.linkListController}
            nodeId={props.state.id}
            isEditingThisNode={isEditingThisNode}
            isLinked={isLinked}
            key={linkState.id}
            linkState={linkState}
            isEditingHasSource={isEditingHasSource}
            editingLinkState={editingLinkState}
            onJointClick={props.onJointClick}
          />
        )
      })}
      {!props.hideNewLink && (
        <Joint
          onClick={(): void => props.onNewJointClick(newLinkId)}
          disabled={isEditingThisNode || isEditingHasSource}
          variant='new'
          linkId={newLinkId}
        />
      )}
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.linkListController.on('add', update))
    uns.push(props.linkListController.on('remove', update))
    uns.push(props.linkListController.on('index', update))
    uns.push(props.linkListController.on('update', update))
    uns.push(props.linkListController.on('targetId', () => setNewLinkId(generateId())))
    uns.push(props.linkListController.on('rules', update))
  }
}

// Private

export interface RuleSetProps {
  nodeId: Id
  linkState: LinkController
  index: number
  isLinked: boolean
  isEditingThisNode: boolean
  linkListController: LinkListController
  isEditingHasSource: boolean
  editingLinkState: LinkController | undefined
  onJointClick: (linkId: Id) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export function RuleSet(props: RuleSetProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: `RuleSet-${props.nodeId}`,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index

      console.log(dragIndex, hoverIndex)

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.linkListController.swapSourceIndexes(props.nodeId, dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: `RuleSet-${props.nodeId}`,
    item: () => {
      return { id: props.linkState.id, index: props.index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div className='rule' key={props.linkState.id} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <UnstyledButton
        className='editRule'
        onClick={(): void => props.linkListController.editingRuleSet.set(props.linkState.id)}
      >
        {props.linkState.rules.value.map((rule) => rule.keyName || rule.name).join(', ')}
      </UnstyledButton>
      <Joint
        disabled={
          props.isEditingThisNode || props.isEditingHasSource || (props.isLinked && Boolean(props.editingLinkState))
        }
        variant={props.isLinked ? 'linked' : 'unlinked'}
        linkId={props.linkState.id}
        onClick={(): void => props.onJointClick(props.linkState.id)}
      />
    </div>
  )
}
