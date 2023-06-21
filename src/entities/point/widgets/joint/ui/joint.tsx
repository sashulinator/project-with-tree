import './joint.css'

import { clsx } from 'clsx'

import UnstyledButton from '~/ui/unstyled-button'
import { Id } from '~/utils/core'

export interface JointProps extends React.HTMLAttributes<HTMLButtonElement> {
  linkId: Id
  variant: 'unlinked' | 'new' | 'linked'
}

export function Joint(props: JointProps): JSX.Element {
  const { linkId, ...divProps } = props

  return (
    <UnstyledButton
      {...divProps}
      data-link-id={linkId}
      className={clsx('point-Joint', `--${props.variant}`, props.className)}
    />
  )
}
