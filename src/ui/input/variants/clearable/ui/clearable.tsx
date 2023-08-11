import './clearable.css'

import { ForwardedRef, forwardRef, useRef } from 'react'

import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { preventDefault, setInputValue } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { setRefs } from '~/utils/react'

import Input, { InputProps } from '../../..'

ClearableInputComponent.displayName = 'ui-Input-v-Clearable'

export type Props = InputProps

function ClearableInputComponent(props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
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
ClearableInput.displayName = ClearableInputComponent.displayName
export default ClearableInput
