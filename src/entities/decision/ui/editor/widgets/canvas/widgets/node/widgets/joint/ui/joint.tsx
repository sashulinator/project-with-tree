import './joint.css'

import { emitter } from '~/shared/emitter'
import { Id, c } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

Joint.displayName = 'decision-Editor-w-Canvas-w-Node-w-Joint'

emitter.emit('addThemes', { dark, light })

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkId: Id
  variant: 'unlinked' | 'new' | 'linked'
}

export default function Joint(props: Props): JSX.Element {
  const { linkId, disabled, ...divProps } = props

  return (
    <button
      {...divProps}
      data-link-id={linkId}
      disabled={disabled}
      className={c(Joint.displayName, `--${props.variant}`, disabled && `--disabled`, props.className)}
    >
      <div />
    </button>
  )
}
