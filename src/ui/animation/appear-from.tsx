import { animated, useSpring } from '@react-spring/web'

import React from 'react'
import { c } from '~/utils/core'

AppearFrom.displayName = 'ui-Animation-AppearFromLeft'

interface AppearFromLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  offset: number
}

export function AppearFrom(props: AppearFromLeftProps): JSX.Element {
  const { offset, ...divProps } = props

  const springProps = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: offset } })

  return <animated.div {...divProps} className={c(props.className, AppearFrom.displayName)} style={springProps} />
}
