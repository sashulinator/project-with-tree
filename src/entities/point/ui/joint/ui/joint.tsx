import './joint.css'

import clsx from 'clsx'

import { Id } from '~/utils/core'

export interface JointProps extends React.HTMLAttributes<HTMLDivElement> {
  linkId: Id
  isLinked: boolean
}

export function Joint(props: JointProps): JSX.Element {
  const { linkId, isLinked, ...divProps } = props

  return (
    <div {...divProps} data-link-id={linkId} className={clsx('point-Joint', props.className, isLinked && '--linked')} />
  )
}
