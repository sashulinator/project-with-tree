import './toolbar.css'

import Flex from '~/abstract/flex/ui/flex'
import Checkbox from '~/ui/checkbox'
import { Id, c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'

import { Controller, ListController } from '../../../../..'

Toolbar.displayName = 'decision-Editor-w-Canvas-w-Node-v-Arbitration-w-Toolbar'

export interface Props {
  state: Controller
  listState: ListController
  className?: string
  selectNodes: (ids: Id[]) => void
  toggle: () => void
}

export default function Toolbar(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const checked = props.listState.selection.isSelected(props.state.id)

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
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
    uns.push(props.listState.on('selection', update))
  }
}
