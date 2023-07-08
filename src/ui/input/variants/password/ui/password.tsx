import './password.css'

import { c } from '~/utils/core'

import Input, { InputProps } from '../../../ui/input'
import { useControlledState } from '~/utils/hooks/controlled-state'
import { EyeOff, Eye } from '~/ui/icon'
import { GhostButton } from '~/ui/button'
import { fns } from '~/utils/function'
import { preventDefault } from '~/utils/dom/prevent-default'
import { ForwardedRef, forwardRef, useRef } from 'react'
import { setRefs } from '~/utils/react'

PasswordInputComponent.displayName = 'ui-PasswordInput'

export interface PasswordInputProps extends InputProps {
  visible?: boolean | undefined
  onVisibleChange?: (value: boolean) => void
}

function PasswordInputComponent(props: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const [visible, setVisible] = useControlledState(false, props.visible, props.onVisibleChange)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Input
      className={c(PasswordInputComponent.displayName)}
      {...props}
      ref={setRefs(ref, inputRef)}
      type={visible ? 'text' : 'password'}
      right={
        <GhostButton
          round={true}
          className='ui-PasswordInput__eye'
          height='s'
          onClick={fns(
            preventDefault,
            (): void => setVisible(!visible),
            (): void => inputRef.current?.focus()
          )}
        >
          {visible ? <EyeOff /> : <Eye />}
        </GhostButton>
      }
    />
  )
}

const PasswordInput = forwardRef(PasswordInputComponent)
export { PasswordInput }
