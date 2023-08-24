import { ForwardedRef, forwardRef } from 'react'

import { Id, c } from '~/utils/core'
import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

Component.displayName = 'a-Canvas-w-Item'

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode
  x: number | string
  y: number | string
  dataId: Id
  rootProps?: React.HTMLAttributes<SVGForeignObjectElement>
}

/**
 * Отрисовывает HTMLElement'ы в заданных координатах
 */
function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { x, y, dataId, rootProps, ...divProps } = props
  const [setMeasureRef, { height, width }] = useMeasure()

  return (
    <foreignObject data-id={dataId} x={x} y={y} height={height} width={width} {...rootProps}>
      <div
        {...divProps}
        className={c(props.className, Component.displayName)}
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
