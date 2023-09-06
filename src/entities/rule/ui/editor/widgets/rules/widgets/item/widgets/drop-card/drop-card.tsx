import './drop-card.css'

import { animated, useSpring } from '@react-spring/web'

import { c } from '~/utils/core'

DropCard.displayName = 'Editor-w-Drop-Card'

interface DropCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rootProps?: React.HTMLAttributes<HTMLDivElement>

  duration?: number
}

export function DropCard(props: DropCardProps): JSX.Element {
  const { rootProps } = props
  const { duration = 200 } = props

  const springProps = useSpring({
    config: { duration },
    transition: 10,
    to: { height: 50 },
    from: { height: 0 },
  })
  return (
    <animated.div
      style={{ ...springProps }}
      className={c(DropCard.displayName, rootProps?.className)}
      {...rootProps}
    ></animated.div>
  )
}
