import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'

import { useState } from 'react'

import { Id } from '~/utils/core'

DndCanvas.displayName = 'ui-DndCanvas'

export default function DndCanvas(): JSX.Element {
  const containers = ['A', 'B', 'C']
  const [parent, setParent] = useState<Id | null>(null)
  const draggableMarkup = <Draggable id='draggable'>Drag me</Draggable>

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        border: '1px solid black',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : 'Drop here'}
          </Droppable>
        ))}
      </DndContext>
    </div>
  )

  function handleDragEnd(event: DragEndEvent): void {
    const { over } = event

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null)
  }
}

function Droppable(props: { children: JSX.Element | string; id: Id }): JSX.Element {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{ background: isOver ? 'green' : undefined, width: '100%', height: '60px', border: '1px solid aqua' }}
    >
      {props.children}
    </div>
  )
}

export function Draggable(props: { children: JSX.Element | string; id: Id }): JSX.Element {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  )
}
