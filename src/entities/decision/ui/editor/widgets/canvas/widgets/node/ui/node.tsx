import './node.css'

import { ReactElement, cloneElement, useRef } from 'react'

import { emitter } from '~/shared/emitter'
import { GestureDragEvent, Item } from '~/ui/canvas'
import { Position, c } from '~/utils/core'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { Controller, ListController } from '..'
import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addThemes', { dark, light })

Node.displayName = 'decision-Editor-w-Canvas-w-Node'

export interface NodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  controller: Controller
  list: ListController
  title: ReactElement | null
  toolbar: ReactElement | null
  sourceLinks?: ReactElement | null
  targetLinks?: ReactElement | null
  rootProps?: React.HTMLAttributes<SVGForeignObjectElement>
  onGestureDrag: (event: GestureDragEvent) => void
  onGestureClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  select: () => void
  toggle: () => void
}

/**
 * Элемент Canvas с фичами
 */
export default function Node(props: NodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const clickPositionRef = useRef<null | Position>(null)

  const { controller, list, title, toolbar, sourceLinks, targetLinks, rootProps, select, toggle, ...itemProps } = props

  const selected = list.selection.isSelected(props.controller.id)
  const cutted = list.cutted.isSelected(props.controller.id)

  return (
    <Item
      {...itemProps}
      dataId={controller.id}
      ref={props.controller.ref.set}
      x={controller.position.value.x}
      y={controller.position.value.y}
      onMouseDown={fns(props.onMouseDown, handleMouseDown)}
      onMouseUp={fns(props.onMouseUp, handleMouseUp)}
      className={c(props.className, Node.displayName, selected && '--selected', cutted && '--cutted')}
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
    if (clickPositionRef.current === null) return

    if (event.currentTarget !== (event.target as HTMLElement)?.parentElement) return

    const mx = Math.abs(event.pageX - clickPositionRef.current.x)
    const my = Math.abs(event.pageY - clickPositionRef.current.y)

    if (mx < 5 && my < 5) {
      isMetaCtrlKey(event) ? toggle() : select()
      props.onGestureClick?.(event)
    }

    clickPositionRef.current = null
  }

  function handleMouseDown(e: React.MouseEvent): void {
    clickPositionRef.current = { x: e.pageX, y: e.pageY }
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(list.on('selection', update))
    uns.push(list.on('cutted', update))
  }
}
