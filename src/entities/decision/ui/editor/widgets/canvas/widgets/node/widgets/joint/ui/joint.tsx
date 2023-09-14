import './joint.css'

import { Id, c } from '~/utils/core'

Joint.displayName = 'decision-Editor-w-Canvas-w-Node-w-Joint'

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
