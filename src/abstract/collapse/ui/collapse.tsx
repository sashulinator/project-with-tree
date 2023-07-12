import { a, useSpring } from '@react-spring/web'

import React, { CSSProperties } from 'react'
import useMeasure from 'react-use-measure'

import { Position, c } from '~/utils/core'

Collapse.displayName = 'a-Collapse'

type CollapseProps = {
  children: React.ReactNode
  isExpanded: boolean
  from?: (CSSProperties & Partial<Position>) | undefined
  to?: (CSSProperties & Partial<Position>) | undefined
  duration?: number | undefined
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
  containerProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

export default function Collapse(props: CollapseProps): JSX.Element {
  const [ref, measure] = useMeasure()
  const viewHeight = measure.height || 'auto'

  const springProps = useSpring({
    config: { duration: props.duration ?? 200 },
    from: { height: viewHeight, ...props.from },
    to: {
      height: props.isExpanded ? viewHeight : 0,
      ...props.to,
    },
  })

  return (
    <a.div
      {...props.rootProps}
      style={{ overflow: 'hidden', ...props.rootProps?.style, ...springProps }}
      className={c(Collapse.displayName, props.rootProps?.className)}
    >
      <a.div {...props.containerProps} ref={ref}>
        {props.children}
      </a.div>
    </a.div>
  )
}
