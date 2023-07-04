import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import Button from '~/abstract/button'
import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

UnstyledButtonComponent.displayName = 'ui-UnstyledButton'

export type UnstyledButtonProps = React.HTMLAttributes<HTMLButtonElement>

function UnstyledButtonComponent(props: UnstyledButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <Button {...props} className={clsx(props.className, UnstyledButtonComponent.displayName)} ref={ref} />
}

const UnstyledButton = forwardRef(UnstyledButtonComponent)
export default UnstyledButton
