import { createElement } from 'react'

import Select from '~/storybook/ui/select'
import Checkbox from '~/ui/checkbox'
import Labeled from '~/ui/labeled'
import { Any, SetterOrUpdater, c } from '~/utils/core'
import { useOnMount } from '~/utils/hooks'

Controls.displayName = 'story-Page-w-Controls'

export interface Props {
  className?: string
  controls: ({ name: string; input: string } & Record<string, Any>)[]
  state: Record<string, Any>
  setState: SetterOrUpdater<Record<string, Any>>
}

export default function Controls(props: Props): JSX.Element {
  return (
    <div className={c(props.className, Controls.displayName)}>
      {props.controls.map((control, i) => {
        return <Control key={i} state={props.state} setState={props.setState} control={control} />
      })}
    </div>
  )
}

interface ControlProps {
  control: { name: string; input: string } & Record<string, Any>
  state: Record<string, Any>
  setState: SetterOrUpdater<Record<string, Any>>
}

function Control(props: ControlProps): JSX.Element {
  const { name, input, ...controlProps } = props.control

  useOnMount(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    props.setState((state) => ({ ...state, [name]: controlProps.defaultValue }))
  })
  return (
    <Labeled label={name || 'UNKNOWN'}>
      {((): React.ReactNode => {
        if (input === 'checkbox') {
          return createElement(Checkbox, {
            ...controlProps,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            checked: props.state[name] ?? false,
            onChange: (e) => {
              props.setState((state) => ({ ...state, [name]: e.target.checked }))
            },
          })
        }

        if (input === 'select') {
          return createElement(Select, {
            ...controlProps,

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: props.state[name],
            placeholder: name,
            onChange: (e) => {
              props.setState((state) => ({ ...state, [name]: e.target.value }))
            },
          })
        }
      })()}
    </Labeled>
  )
}
