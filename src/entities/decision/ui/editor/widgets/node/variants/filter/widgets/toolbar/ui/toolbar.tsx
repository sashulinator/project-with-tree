import './toolbar.css'

import Flex from '~/abstract/flex/ui/flex'

import { GhostButton } from '~/ui/button'
import Checkbox from '~/ui/checkbox'
import { Trash } from '~/ui/icon'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { fns } from '~/utils/function'

import { State, ListState } from '../../../../..'

Toolbar.displayName = 'decisionEditor-ui-Canvas-w-Node-v-Filter-w-Toolbar'

export interface Props {
  state: State
  listState: ListState
  className?: string
  remove: () => void
}

export default function Toolbar(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const computation = props.state.computation.value
  const checked = props.listState.selection.isSelected(props.state.id)

  return (
    <div className={c(props.className, Toolbar.displayName)}>
      <Flex mainAxis='center' crossAxis='center'>
        <Checkbox
          round={true}
          checked={checked}
          className='selection'
          onChange={(): void => props.listState.selection.toggle(props.state.id)}
        />
      </Flex>
      <Flex>
        <GhostButton onClick={toogleComputation} style={{ fontSize: '0.6em' }}>
          {computation}
        </GhostButton>
        <GhostButton
          onClick={fns(props.remove, (): void => props.listState.selection.remove(props.state.id))}
          round={true}
        >
          <Trash />
        </GhostButton>
      </Flex>
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
    uns.push(props.listState.on('selection', update))
  }

  function toogleComputation(): void {
    props.state.computation.set(computation === 'successively' ? 'parallel' : 'successively')
  }
}
