import './clearable.css'

import { c } from '~/utils/core'

import Input, { InputProps } from '../../../ui/input'
import { GhostButton } from '~/ui/button'
import { fns } from '~/utils/function'
import { preventDefault } from '~/utils/dom/prevent-default'
import { ForwardedRef, forwardRef, useRef } from 'react'
import { Close } from '~/ui/icon'
import { setRefs } from '~/utils/react'
import { setInputValue } from '~/utils/dom/set-input-value'

ClearableInputComponent.displayName = 'ui-Input-v-Clearable'

export interface ClearableInputProps extends InputProps {
  visible?: boolean | undefined
  onVisibleChange?: (value: boolean) => void
}

function ClearableInputComponent(props: ClearableInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Input
      className={c(ClearableInputComponent.displayName)}
      {...props}
      ref={setRefs(inputRef, ref)}
      right={
        props.value ? (
          <GhostButton
            round={true}
            height='s'
            className='close'
            onClick={fns(
              preventDefault,
              (): void => setInputValue(inputRef.current, ''),
              (): void => inputRef.current?.focus()
            )}
          >
            <Close />
          </GhostButton>
        ) : null
      }
    />
  )
}

const ClearableInput = forwardRef(ClearableInputComponent)
export { ClearableInput }
