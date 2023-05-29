import { ForwardedRef, forwardRef } from 'react'

export interface ItemProps extends React.HTMLAttributes<SVGForeignObjectElement> {
  children: React.ReactNode
  height: number
  width: number
  x: number
  y: number
}

/**
 * Основываясь на state отрисовывает Item в нужном месте
 */
function CanvasItemComponent(props: ItemProps, ref: ForwardedRef<SVGForeignObjectElement>): JSX.Element {
  const { ...gProps } = props

  return (
    <foreignObject
      {...gProps}
      ref={ref}
      style={{
        overflow: 'visible',
        ...gProps.style,
      }}
    >
      {props.children}
    </foreignObject>
  )
}

const CanvasItem = forwardRef(CanvasItemComponent)
CanvasItem.displayName = 'CanvasItem'
export default CanvasItem
