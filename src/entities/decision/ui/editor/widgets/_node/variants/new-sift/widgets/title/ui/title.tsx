import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import { NodeState } from '../../../../..'
import { useUpdate } from '~/utils/hooks'

interface TitleProps {
  state: NodeState
}

export default function Title(props: TitleProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Input
      {...useChangeOnBlurStrategy({
        value: props.state.title.value,
        cannotBeEmpty: true,
        transparent: true,
        height: 'm',
        placeholder: 'Описание',
        fieldProps: { className: 'titleInputField' },
        onChange: (e) => props.state.title.set(e.currentTarget.value),
      })}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('title', update))
  }
}
