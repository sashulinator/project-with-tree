import './toolbar.scss'

import Flex from '~/abstract/flex/ui/flex'
import Checkbox from '~/ui/checkbox'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { useUpdate } from '~/utils/hooks'

import { ListController, State } from '../../../../..'

Toolbar.displayName = 'decision-Editor-w-Canvas-w-Node-v-Filter-w-Toolbar'

export interface Props {
  state: State
  listState: ListController
  className?: string
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
        <Checkbox
          round={true}
          checked={checked}
          className='selection'
          onChange={(): void => props.listState.selection.toggle(props.state.id)}
        />
      </Flex>
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
    uns.push(props.listState.on('selection', update))
  }
}
