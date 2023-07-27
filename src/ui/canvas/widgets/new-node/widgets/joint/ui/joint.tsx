import './joint.css'

import { clsx } from 'clsx'

import { emitter } from '~/shared/emitter'
import { Id } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

Joint.displayName = 'ui-Canvas-w-Node-w-Joint'

emitter.emit('addTheme', { dark, light })

export interface JointProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkId: Id
  variant: 'unlinked' | 'new' | 'linked'
}

export function Joint(props: JointProps): JSX.Element {
  const { linkId, disabled, ...divProps } = props

  return (
    <button
      {...divProps}
      data-link-id={linkId}
      disabled={disabled}
      className={clsx(Joint.displayName, `--${props.variant}`, disabled && `--disabled`, props.className)}
    >
      <div></div>
    </button>
  )
}
