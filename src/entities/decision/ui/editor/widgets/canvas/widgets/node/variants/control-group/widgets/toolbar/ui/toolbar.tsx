import './toolbar.css'

import Flex from '~/abstract/flex'
import Checkbox from '~/ui/checkbox'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '../../../../..'
import { Controller as ListController } from '../../../../list'

Toolbar.displayName = 'decision-Editor-w-Canvas-w-Node-v-ControlGroup-w-Toolbar'

export interface Props {
  controller: Controller
  list: ListController
  className?: string
  toggle: () => void
  select: () => void
}

export default function Toolbar(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const checked = props.list.selection.isSelected(props.controller.id)

  return (
    <div className={c(props.className, Toolbar.displayName)}>
      {/**
       * Почему-то при откликивании чекбокса stopPropagation не работает
       * и событие улетает до svg, поэтому обернем его в div
       * и на нем применим stopPropagation
       */}
      <Flex mainAxis='center' crossAxis='center' onClick={stopPropagation}>
        <Checkbox round={true} checked={checked} className='selection' onChange={props.toggle} />
      </Flex>
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('computation', update))
    uns.push(props.list.on('selection', update))
  }
}
