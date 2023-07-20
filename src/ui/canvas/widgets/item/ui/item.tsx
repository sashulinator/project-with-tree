import { FullGestureState, useDrag } from '@use-gesture/react'
import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import { Item as AbstractItem } from '~/abstract/canvas'
import { Id } from '~/utils/core'
import { fns } from '~/utils/function'

Component.displayName = 'ui-Canvas-w-Item'

export type GestureDragEvent = Omit<FullGestureState<'drag'>, 'event'> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
}

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  x: number | string
  y: number | string
  children: React.ReactNode
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Элемент Canvas с фичами
 * 1. onGestureDrug
 */
export function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { onGestureDrug, ...canvasItemProps } = props

  const draggableProps = useDrag(onGestureDrug)()

  return (
    <AbstractItem
      {...canvasItemProps}
      dataId={props.dataId}
      ref={ref}
      className={clsx(props.className, Component.displayName)}
      style={{ touchAction: 'none', ...canvasItemProps.style }}
      onKeyDown={fns(draggableProps.onKeyDown, canvasItemProps.onKeyDown)}
      onKeyUp={fns(draggableProps.onKeyUp, canvasItemProps.onKeyUp)}
      onLostPointerCapture={fns(draggableProps.onLostPointerCapture, canvasItemProps.onLostPointerCapture)}
      onPointerCancel={fns(draggableProps.onPointerCancel, canvasItemProps.onPointerCancel)}
      onPointerDown={fns(draggableProps.onPointerDown, canvasItemProps.onPointerDown)}
      onPointerMove={fns(draggableProps.onPointerMove, canvasItemProps.onPointerMove)}
      onPointerUp={fns(draggableProps.onPointerUp, canvasItemProps.onPointerUp)}
    />
  )
}

const Item = forwardRef(Component)
Item.displayName = Component.displayName
export default Item
