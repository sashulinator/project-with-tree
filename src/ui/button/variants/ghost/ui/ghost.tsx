import './ghost.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { emitter } from '~/shared/emitter'

import Button, { ButtonProps } from '../../../ui/button'
import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

GhostButtonComponent.displayName = 'ui-Button-v-Ghost'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GhostButtonProps extends ButtonProps {}

function GhostButtonComponent(props: GhostButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <Button {...props} ref={ref} className={clsx(props.className, GhostButtonComponent.displayName)} />
}

const GhostButton = forwardRef(GhostButtonComponent)
GhostButton.displayName = GhostButtonComponent.displayName
export { GhostButton }
