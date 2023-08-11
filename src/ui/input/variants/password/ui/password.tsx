import './password.css'

import { ForwardedRef, forwardRef, useRef } from 'react'

import { GhostButton } from '~/ui/button'
import { Eye, EyeOff } from '~/ui/icon'
import { c } from '~/utils/core'
import { preventDefault } from '~/utils/dom'
import { fns } from '~/utils/function'
import { useControlledState } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import Input, { InputProps } from '../../..'

PasswordComponent.displayName = 'ui-Input-v-Password'

export interface Props extends InputProps {
  visible?: boolean | undefined
  onVisibleChange?: (value: boolean) => void
}

function PasswordComponent(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const [visible, setVisible] = useControlledState(false, props.visible, props.onVisibleChange)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Input
      className={c(PasswordComponent.displayName)}
      {...props}
      ref={setRefs(ref, inputRef)}
      type={visible ? 'text' : 'password'}
      right={
        <GhostButton
          round={true}
          className='eye'
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

const Password = forwardRef(PasswordComponent)
Password.displayName = PasswordComponent.displayName
export default Password
