import { clsx } from 'clsx'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'

import { Id } from '~/utils/core'
import { observeResize } from '~/utils/dom'
import { getStyle } from '~/utils/dom/get-style'
import { useForceUpdate } from '~/utils/hooks'
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

  const [measureRef, setMeasureRef] = useState<HTMLElement | null>(null)
  const styles = getStyle(measureRef)
  const update = useForceUpdate()

  useEffect(() => observeResize(measureRef, update), [measureRef])

  return (
    <foreignObject data-id={dataId} x={x} y={y} height={styles?.height} width={styles?.width}>
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
