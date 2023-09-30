import './toolbar.css'

import Flex from '~/abstract/flex/ui/flex'
import { GhostButton } from '~/ui/button'
import Checkbox from '~/ui/checkbox'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { Controller, ListController } from '../../../../..'

Toolbar.displayName = 'decision-Editor-w-Canvas-w-Node-v-Filter-w-Toolbar'

export interface Props {
  controller: Controller
  list: ListController
  className?: string
  select: () => void
  toggle: () => void
}

const RU = {
  successively: 'Последовательно',
  parallel: 'Параллельно',
}

export default function Toolbar(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const computation = props.controller.computation.value
  const checked = props.list.selection.isSelected(props.controller.id)

  return (
    <div className={c(props.className, Toolbar.displayName)}>
      {/**
       * Почему-то при откликивании чекбокса stopPropagation не работает
       * и событие улетает до svg, поэтому обернем его в div
       * и на нем применим stopPropagation
       */}
      <Flex mainAxis='center' crossAxis='center' onClick={stopPropagation}>
        <Checkbox round={true} checked={checked} className='selection' onChange={fns(stopPropagation, props.toggle)} />
      </Flex>
      <Flex>
        <GhostButton onClick={toogleComputation} style={{ fontSize: '0.6em' }}>
          {RU[computation || 'parallel']}
        </GhostButton>
      </Flex>
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('computation', update))
    uns.push(props.list.on('selection', update))
  }

  function toogleComputation(): void {
    props.controller.computation.set(computation === 'successively' ? 'parallel' : 'successively')
  }
}
