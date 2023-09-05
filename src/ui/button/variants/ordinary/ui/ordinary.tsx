import './ordinary.css'

import { ForwardedRef, forwardRef } from 'react'

import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import Button, { ButtonProps } from '../../../ui/button'
import { dark } from '../_themes/dark'
import { light } from '../_themes/light'

emitter.emit('addTheme', { dark, light })

OrdinaryComponent.displayName = 'ui-Button-v-Ordinary'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props extends ButtonProps {}

function OrdinaryComponent(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <Button {...props} ref={ref} className={c(props.className, OrdinaryComponent.displayName)} />
}

const Ordinary = forwardRef(OrdinaryComponent)
Ordinary.displayName = OrdinaryComponent.displayName
export default Ordinary
