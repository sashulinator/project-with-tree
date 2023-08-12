import './node.css'

import { ReactElement, cloneElement, useRef } from 'react'

import { emitter } from '~/shared/emitter'
import { GestureDragEvent, Item } from '~/ui/canvas'
import { Position, assertNotNull, c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { ListState, State as NodeState } from '..'
import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

Node.displayName = 'decisionEditor-ui-Canvas-w-Node'

export interface NodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  state: NodeState
  listState: ListState
  title: ReactElement | null
  toolbar: ReactElement | null
  sourceLinks?: ReactElement | null
  targetLinks?: ReactElement | null
  rootProps?: React.HTMLAttributes<SVGForeignObjectElement>
  onGestureDrug: (event: GestureDragEvent) => void
  onGestureClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * Элемент Canvas с фичами
 */
export default function Node(props: NodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const clickPositionRef = useRef<null | Position>(null)

  const { title, toolbar, sourceLinks, listState, targetLinks, state, rootProps, ...itemProps } = props
  const selected = listState.selection.isSelected(props.state.id)

  return (
    <Item
      {...itemProps}
      dataId={state.id}
      ref={props.state.ref.set}
      x={state.position.value.x}
      y={state.position.value.y}
      onMouseDown={fns(props.onMouseDown, handleMouseDown)}
      onMouseUp={fns(props.onMouseUp, handleMouseUp)}
      className={c(props.className, Node.displayName, selected && `--selected`)}
      style={{ width: '20rem' }}
      rootProps={{ ...rootProps, style: { overflow: 'visible', ...rootProps?.style } }}
    >
      {toolbar && cloneElement(toolbar, { className: 'toolbar' })}
      {title && cloneElement(title, { className: 'title' })}
      <div className='links'>
        {targetLinks && cloneElement(targetLinks, { className: 'targetLinks' })}
        <hr style={{ opacity: '0.1' }} />
        {sourceLinks && cloneElement(sourceLinks, { className: 'targetLinks' })}
      </div>
    </Item>
  )

  // Private

  function handleMouseUp(event: React.MouseEvent<HTMLDivElement>): void {
    assertNotNull(clickPositionRef.current)

    if (event.currentTarget !== (event.target as HTMLElement)?.parentElement) return

    const mx = event.pageX - clickPositionRef.current.x
    const my = event.pageY - clickPositionRef.current.y

    if (mx < 5 && my < 5) {
      props.listState.selection.toggle(props.state.id)
      props.onGestureClick?.(event)
    }

    clickPositionRef.current = null
  }

  function handleMouseDown(e: React.MouseEvent): void {
    clickPositionRef.current = { x: e.pageX, y: e.pageY }
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(listState.on('selection', update))
  }
}
