import './source-links.css'

import type { Identifier, XYCoord } from 'dnd-core'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { UnstyledButton } from '~/abstract/button'
import Flex from '~/abstract/flex'
import { GhostButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id, c, generateId } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller, Joint } from '../../..'
import { LinkController, LinkListController } from '../../../../../../..'

SourceLinks.displayName = 'decision-Editor-w-Canvas-w-Node-w-SourceLinks'

export interface Props {
  className?: string
  controller: Controller
  linkList: LinkListController
  hideNewLink?: boolean | undefined
  hideRules?: boolean | undefined
  startLinkCreating: (newLinkId: Id) => void
  startLinkEditing: (linkId: Id) => void
  addLink: () => void
}

export default function SourceLinks(props: Props): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(generateId)

  useUpdate(subscribeOnUpdates)

  const editingLinkState = props.linkList.findJointEditingLink()
  const isEditingThisNode =
    editingLinkState?.sourceId.value === props.controller.id || editingLinkState?.targetId.value === props.controller.id
  const isEditingHasSource = Boolean(editingLinkState?.sourceId.value)

  const sourceLinkStates = props.linkList
    .getBySourceId(props.controller.id)
    .sort((a, b) => (a.index.value < b.index.value ? -1 : 1))

  // if (props.state.id === 'id2') {
  //   console.log('isEditingHasSource', isEditingHasSource, editingLinkState)
  // }

  return (
    <div className={c(props.className, SourceLinks.displayName)}>
      {sourceLinkStates.map((linkController, i) => {
        if (linkController.id === newLinkId) return null
        const isLinked = Boolean(linkController.targetId.value)

        return (
          <RuleSet
            index={i}
            hideRules={props.hideRules}
            linkList={props.linkList}
            nodeId={props.controller.id}
            isEditingThisNode={isEditingThisNode}
            isLinked={isLinked}
            key={linkController.id}
            link={linkController}
            isEditingHasSource={isEditingHasSource}
            editingLinkState={editingLinkState}
            onJointClick={props.startLinkEditing}
          />
        )
      })}
      {!props.hideNewLink && (
        <Flex mainAxis='center' crossAxis='center'>
          {!props.hideRules && (
            <GhostButton className='plusButton' onClick={props.addLink} round={true}>
              <Plus />
            </GhostButton>
          )}
          <Joint
            className='joint'
            onClick={(): void => props.startLinkCreating(newLinkId)}
            disabled={isEditingThisNode || isEditingHasSource}
            variant='new'
            linkId={newLinkId}
          />
        </Flex>
      )}
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.linkList.on('add', update))
    uns.push(props.linkList.on('remove', update))
    uns.push(props.linkList.on('index', update))
    uns.push(props.linkList.on('update', update))
    uns.push(props.linkList.on('targetId', () => setNewLinkId(generateId())))
    uns.push(props.linkList.on('rules', update))
  }
}

// Private

export interface RuleSetProps {
  nodeId: Id
  link: LinkController
  index: number
  isLinked: boolean
  hideRules?: boolean | undefined
  isEditingThisNode: boolean
  linkList: LinkListController
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
      props.linkList.swapSourceIndexes(props.nodeId, dragIndex, hoverIndex)

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
      return { id: props.link.id, index: props.index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div className='rule' key={props.link.id} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {!props.hideRules && (
        <UnstyledButton className='editRule' onClick={(): void => props.linkList.rulesEditingId.set(props.link.id)}>
          {props.link.rules.value.map((rule) => rule.keyName || rule.name).join(', ')}
        </UnstyledButton>
      )}
      <Joint
        className='joint'
        disabled={
          props.isEditingThisNode || props.isEditingHasSource || (props.isLinked && Boolean(props.editingLinkState))
        }
        variant={props.isLinked ? 'linked' : 'unlinked'}
        linkId={props.link.id}
        onClick={(): void => props.onJointClick(props.link.id)}
      />
    </div>
  )
}
