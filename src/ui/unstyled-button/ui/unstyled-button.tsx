import './unstyled-button.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import Button from '~/abstract/button'
import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

UnstyledButtonComponent.displayName = 'ui-UnstyledButton'

emitter.emit('addTheme', { dark, light })

export type UnstyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  height?: 's' | 'm' | 'l'
  square?: boolean
  round?: boolean
}

function UnstyledButtonComponent(props: UnstyledButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm', square, round, ...restProps } = props

  return (
    <Button
      {...restProps}
      ref={ref}
      className={clsx(
        UnstyledButtonComponent.displayName,
        `--${height}`,
        square && '--square',
        round && `--square --round`,
        props.className
      )}
    >
      {props.children}
    </Button>
  )
}

const UnstyledButton = forwardRef(UnstyledButtonComponent)
export default UnstyledButton
