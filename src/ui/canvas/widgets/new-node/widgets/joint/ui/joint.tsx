import './joint.css'

import { clsx } from 'clsx'

import { emitter } from '~/shared/emitter'
import { Id } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

Joint.displayName = 'ui-Canvas-w-Node-w-Joint'

emitter.emit('addTheme', { dark, light })

export interface JointProps extends React.HTMLAttributes<HTMLDivElement> {
  linkId: Id
  disabled?: boolean
  variant: 'unlinked' | 'new' | 'linked'
}

export function Joint(props: JointProps): JSX.Element {
  const { linkId, disabled, ...divProps } = props

  return (
    <div
      {...divProps}
      data-link-id={linkId}
      className={clsx(Joint.displayName, `--${props.variant}`, disabled && `--disabled`, props.className)}
    />
  )
}
