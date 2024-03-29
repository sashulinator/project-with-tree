import './title.scss'

import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '../../..'

Title.displayName = 'decision-Editor-w-Canvas-w-Node-w-Title'

export interface Props {
  className?: string
  controller: Controller
}

export default function Title(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Input
      {...useChangeOnBlurStrategy({
        className: c(props.className, Title.displayName),
        inputClassname: 'input',
        value: props.controller.title.value,
        cannotBeEmpty: true,
        transparent: true,
        height: 'm',
        placeholder: 'Описание',
        onChange: (e) => props.controller.title.set(e.currentTarget.value),
      })}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('title', update))
  }
}
