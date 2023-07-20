import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { Id } from '~/utils/core'

import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

Component.displayName = 'a-Canvas-w-Item'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  x: number | string
  y: number | string
  dataId: Id
}

/**
 * Отрисовывает HTMLElement'ы в заданных координатах
 */
function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { x, y, dataId, ...divProps } = props
  const [setMeasureRef, { height, width }] = useMeasure()

  return (
    <foreignObject data-id={dataId} x={x} y={y} height={height} width={width}>
      <div
        {...divProps}
        className={clsx(props.className, Component.displayName)}
        style={{ height: 'fit-content', width: 'fit-content', ...props.style }}
        ref={setRefs(setMeasureRef, ref)}
      >
        {props.children}
      </div>
    </foreignObject>
  )
}

const Item = forwardRef(Component)
Item.displayName = Component.displayName
export default Item
