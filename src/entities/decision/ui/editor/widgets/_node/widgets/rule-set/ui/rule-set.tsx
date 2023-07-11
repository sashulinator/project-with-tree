import './rule-set.css'

import type { Identifier, XYCoord } from 'dnd-core'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Id } from '~/utils/core'

import { Joint, JointProps } from '../../joint'

export interface RuleSetProps {
  children: React.ReactNode
  nodeId: Id
  jointProps: JointProps
  index: number
  moveRuleSet: (dragI: number, hoverI: number) => void
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
      props.moveRuleSet(dragIndex, hoverIndex)

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
      return { id: props.jointProps.id, index: props.index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div className='RuleSet' ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {props.children}
      <Joint {...props.jointProps} />
    </div>
  )
}
