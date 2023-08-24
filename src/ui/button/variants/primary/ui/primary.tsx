import './primary.css'

import { ForwardedRef, forwardRef } from 'react'

import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import Button, { ButtonProps } from '../../../ui/button'
import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

PrimaryButtonComponent.displayName = 'ui-Button-v-Primary'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrimaryButtonProps extends ButtonProps {}

function PrimaryButtonComponent(props: PrimaryButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <Button {...props} ref={ref} className={c(props.className, PrimaryButtonComponent.displayName)} />
}

const PrimaryButton = forwardRef(PrimaryButtonComponent)
PrimaryButton.displayName = PrimaryButtonComponent.displayName
export { PrimaryButton }
