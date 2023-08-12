import './decision-panel.css'

import { memo } from 'react'

import { routes } from '~/shared/routes'
import { PrimaryButton } from '~/ui/button'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import Link from '~/ui/link/ui/link'
import ThemeDropdown from '~/ui/theme-dropdown'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { State } from '../../..'

DecisionPanelComponent.displayName = 'decision-Editor-DecisionPanel'

export interface DecisionPanelProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  state: State
}

function DecisionPanelComponent(props: DecisionPanelProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <div {...props.rootProps} className={c(DecisionPanelComponent.displayName, props.rootProps?.className)}>
      <div className='left'>
        <Link to={routes.decisionList.getURL()}>Назад</Link>
      </div>
      <div className='center'>
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
      <div className='right'>
        <div className='controls'>
          <div className='tools'>
            <ThemeDropdown />
          </div>
          <PrimaryButton>Сохранить</PrimaryButton>
        </div>
      </div>
    </div>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('name', update))
  }
}

const DecisionPanel = memo(DecisionPanelComponent)
DecisionPanel.displayName = DecisionPanelComponent.displayName
export default DecisionPanel
