import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { Id } from '~/utils/core'

import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  x: number
  y: number
  dataId: Id
}

/**
 * Отрисовывает HTMLElement'ы в заданных координатах
 */
function ItemComponent(props: ItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { x, y, dataId, ...divProps } = props
  const [setMeasureRef, { height, width }] = useMeasure()

  return (
    <foreignObject data-id={dataId} x={x} y={y} height={height} width={width}>
      <div
        {...divProps}
        className={clsx(props.className, 'a-CanvasItem')}
        style={{ height: 'fit-content', width: 'fit-content', ...props.style }}
        ref={setRefs(setMeasureRef, ref)}
      >
        {props.children}
      </div>
    </foreignObject>
  )
}

const Item = forwardRef(ItemComponent)
Item.displayName = 'AbstractCanvasItem'
export { Item }
