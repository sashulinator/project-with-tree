import './title.css'

import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { State } from '../../..'

Title.displayName = 'decisionEditor-ui-Canvas-w-Node-w-Title'

export interface Props {
  className?: string
  state: State
}

export default function Title(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Input
      {...useChangeOnBlurStrategy({
        value: props.state.title.value,
        cannotBeEmpty: true,
        transparent: true,
        height: 'm',
        placeholder: 'Описание',
        fieldProps: { className: c(props.className, Title.displayName) },
        onChange: (e) => props.state.title.set(e.currentTarget.value),
      })}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('title', update))
  }
}
