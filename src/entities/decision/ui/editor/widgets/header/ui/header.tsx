import './header.css'

import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import Flex from '~/abstract/flex/ui/flex'
import { routes } from '~/shared/routes'
import { GhostButton, PrimaryButton } from '~/ui/button'
import { ChevronLeft } from '~/ui/icon/variants/chevron-left'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import ClearableInput from '~/ui/input/variants/clearable'
import ThemeDropdown from '~/ui/theme-dropdown'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller, NodeListController } from '../../..'

HeaderComponent.displayName = 'decision-Editor-w-Header'

export interface Props {
  className?: string
  editor: Controller
  nodeList: NodeListController
  submit: () => void
}

function HeaderComponent(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const navigate = useNavigate()

  return (
    <div className={c(props.className, HeaderComponent.displayName)}>
      <Flex className='left' gap='s' padding='0 0 0 var(--s)' crossAxis='center'>
        <GhostButton square={true} onClick={(): void => navigate(routes.decisionList.getURL())}>
          <ChevronLeft />
        </GhostButton>
        <ClearableInput
          transparent={true}
          value={props.nodeList.searchQuery.value}
          onChange={(ev): void => props.nodeList.searchQuery.set(ev.currentTarget.value)}
          placeholder='Поиск'
        />
      </Flex>
      <div className='center'>
        <div className='name'>
          <Input
            {...useChangeOnBlurStrategy({
              transparent: true,
              cannotBeEmpty: true,
              value: props.editor.name.value,
              placeholder: 'Имя',
              onChange: (ev): void => props.editor.name.set(ev.currentTarget.value),
            })}
          />
        </div>
      </div>
      <div className='right'>
        <div className='controls'>
          <div className='tools'>
            <ThemeDropdown />
          </div>
          <PrimaryButton onClick={props.submit}>Сохранить</PrimaryButton>
        </div>
      </div>
    </div>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.editor.on('name', update))
    uns.push(props.nodeList.on('searchQuery', update))
  }
}

const Header = memo(HeaderComponent)
Header.displayName = HeaderComponent.displayName
export default Header
