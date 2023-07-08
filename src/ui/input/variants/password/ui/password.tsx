import './password.css'

import { c } from '~/utils/core'

import Input, { InputProps } from '../../../ui/input'
import { useControlledState } from '~/utils/hooks/controlled-state'
import { EyeOff } from '~/ui/icon/widgets/eye-off'
import { Eye } from '~/ui/icon/widgets/eye'
import { GhostButton } from '~/ui/button'
import { fns } from '~/utils/function'
import { preventDefault } from '~/utils/dom/prevent-default'
import { ForwardedRef, forwardRef } from 'react'

PasswordInputComponent.displayName = 'ui-PasswordInput'

export interface PasswordInputProps extends InputProps {
  visible?: boolean | undefined
  onVisibleChange?: (value: boolean) => void
}

function PasswordInputComponent(props: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const [visible, setVisible] = useControlledState(false, props.visible, props.onVisibleChange)

  return (
    <Input
      className={c(PasswordInputComponent.displayName)}
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      right={
        <GhostButton
          round={true}
          className='ui-PasswordInput__eye'
          height='s'
          onClick={fns(preventDefault, (): void => setVisible(!visible))}
        >
          {visible ? <EyeOff /> : <Eye />}
        </GhostButton>
      }
    />
  )
}

const PasswordInput = forwardRef(PasswordInputComponent)
export { PasswordInput }
