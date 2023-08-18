import './header.css'

import { memo } from 'react'

import { routes } from '~/shared/routes'
import { PrimaryButton } from '~/ui/button'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import Link from '~/ui/link/ui/link'
import ThemeDropdown from '~/ui/theme-dropdown'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { State } from '../../..'

HeaderComponent.displayName = 'decision-Editor-w-Header'

export interface Props {
  className?: string
  state: State
}

function HeaderComponent(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <div className={c(props.className, HeaderComponent.displayName)}>
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

const Header = memo(HeaderComponent)
Header.displayName = HeaderComponent.displayName
export default Header
