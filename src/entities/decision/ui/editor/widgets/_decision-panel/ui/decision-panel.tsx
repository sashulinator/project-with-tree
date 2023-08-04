import './decision-panel.css'

import { clsx } from 'clsx'

import ThemeDropdown from '~/ui/theme-dropdown'
import { useUpdate } from '~/utils/hooks'

import { State } from '../../..'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'

DecisionPanel.displayName = 'decision-Editor-DecisionPanel'

interface DecisionPanelProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  state: State
}

export default function DecisionPanel(props: DecisionPanelProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <div {...props.rootProps} className={clsx(DecisionPanel.displayName, props.rootProps?.className)}>
      <div className='tools'>
        <ThemeDropdown />
      </div>

      <div className='name'>
        <Input
          {...useChangeOnBlurStrategy({
            transparent: true,
            cannotBeEmpty: true,
            value: props.state.name.value,
            placeholder: 'Имя',
            onChange: (ev): void => props.state.name.set(ev.currentTarget.value),
          })}
        />
      </div>
    </div>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('name', update))
  }
}
