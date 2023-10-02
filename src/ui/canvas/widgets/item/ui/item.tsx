import { useDrag } from '@use-gesture/react'

import { ForwardedRef, forwardRef } from 'react'

import { Item as AbstractItem, ItemProps as AbstractItemProps } from '~/abstract/canvas'
import { c } from '~/utils/core'
import { fns } from '~/utils/function'

import { GestureDragEvent } from '../types/gesture-drag-event'

Component.displayName = 'ui-Canvas-w-Item'

export interface Props extends AbstractItemProps {
  onGestureDrag: (event: GestureDragEvent) => void
}

/**
 * Элемент Canvas с фичами
 * 1. onGestureDrag
 */
export function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { onGestureDrag, ...canvasItemProps } = props

  const draggableProps = useDrag(onGestureDrag)()

  return (
    <AbstractItem
      {...canvasItemProps}
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      tabIndex={0}
      ref={ref}
      className={c(props.className, Component.displayName)}
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
