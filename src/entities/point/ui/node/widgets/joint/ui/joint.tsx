import './joint.css'

import { clsx } from 'clsx'

import { emitter } from '~/shared/emitter'
import Button from '~/ui/unstyled-button'
import { Id } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

Joint.displayName = 'point-NodeJoint'

emitter.emit('addTheme', { dark, light })

export interface JointProps extends React.HTMLAttributes<HTMLButtonElement> {
  linkId: Id
  variant: 'unlinked' | 'new' | 'linked'
}

export function Joint(props: JointProps): JSX.Element {
  const { linkId, ...divProps } = props

  return (
    <Button
      {...divProps}
      data-link-id={linkId}
      className={clsx(Joint.displayName, `--${props.variant}`, props.className)}
    />
  )
}
