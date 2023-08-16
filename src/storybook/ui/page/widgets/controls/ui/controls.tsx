import { createElement } from 'react'
import { Control } from '~/storybook/types'

import Select from '~/storybook/ui/select'
import Checkbox from '~/ui/checkbox'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled'
import { Any, Key, SetterOrUpdater, c } from '~/utils/core'
import { getPath, setPath } from '~/utils/dictionary'

Controls.displayName = 'story-Page-w-Controls'

export interface Props {
  className?: string
  controls: Control[]
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
  control: Control
  state: Record<string, Any>
  setState: SetterOrUpdater<Record<string, Any>>
}

function Control(props: ControlProps): JSX.Element {
  const { name, input, path, defaultValue: _, ...controlProps } = props.control

  return (
    <Labeled label={name || 'UNKNOWN'}>
      {((): React.ReactNode => {
        if (input === 'checkbox') {
          return createElement(Checkbox, {
            ...controlProps,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            checked: getPath(props.state, path || [name]) || false,
            onChange: (e) => {
              props.setState((state) => setPath(path || [name], e.target.checked, state))
            },
          })
        }

        if (input === 'select') {
          return createElement(Select, {
            ...controlProps,

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: getPath(props.state, path || [name]),
            placeholder: name,
            onChange: (e) => {
              props.setState((state) => setPath(path || [name], e.target.value, state))
            },
          })
        }

        if (input === 'input') {
          return createElement(Input, {
            ...controlProps,

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: getPath(props.state, path || [name]),
            placeholder: name,
            onChange: (e) => {
              props.setState((state) => setPath(path || [name], e.target.value, state))
            },
          })
        }
      })()}
    </Labeled>
  )
}
