import { animated, useSpring } from '@react-spring/web'

import React from 'react'
import { c } from '~/utils/core'

AppearFrom.displayName = 'ui-Animation-AppearFromLeft'

interface AppearFromLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  offsetX?: number | undefined
  offsetY?: number | undefined
  delay?: number | undefined
}

export function AppearFrom(props: AppearFromLeftProps): JSX.Element {
  const { offsetX = 0, offsetY = 0, delay, ...divProps } = props

  const springProps = useSpring({ delay, to: { opacity: 1, x: 0, y: 0 }, from: { opacity: 0, x: offsetX, y: offsetY } })

  return <animated.div {...divProps} className={c(props.className, AppearFrom.displayName)} style={springProps} />
}
