import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

export interface ItemProps extends React.HTMLAttributes<SVGForeignObjectElement> {
  children: React.ReactNode
  height: number
  width: number
  x: number
  y: number
}

/**
 * Отрисовывает HTMLElement'ы в заданных координатах
 */
function ItemComponent(props: ItemProps, ref: ForwardedRef<SVGForeignObjectElement>): JSX.Element {
  return (
    <foreignObject
      {...props}
      className={clsx(props.className, 'a-CanvasItem')}
      style={{ overflow: 'visible', ...props.style }}
      ref={ref}
    >
      {props.children}
    </foreignObject>
  )
}

const Item = forwardRef(ItemComponent)
Item.displayName = 'AbstractCanvasItem'
export { Item }
