import './toolbar.css'

import { GhostButton } from '~/ui/button'
import { Trash } from '~/ui/icon'
import { State } from '../../../../../models/state'
import { useUpdate } from '~/utils/hooks'
import { c } from '~/utils/core'
import Checkbox from '~/ui/checkbox'
import Flex from '~/abstract/flex/ui/flex'

Toolbar.displayName = 'decisionEditor-ui-Canvas-w-Node-v-Filter-w-Toolbar'

interface ToolbarProps {
  className?: string
  state: State
  remove: () => void
}

export default function Toolbar(props: ToolbarProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const computation = props.state.computation.value

  return (
    <div className={c(props.className, Toolbar.displayName)}>
      <Flex mainAxis='center' crossAxis='center'>
        <Checkbox round className='selection' />
      </Flex>
      <Flex>
        <GhostButton onClick={toogleComputation} style={{ fontSize: '0.6em' }}>
          {computation}
        </GhostButton>
        <GhostButton onClick={props.remove} round={true}>
          <Trash />
        </GhostButton>
      </Flex>
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
  }

  function toogleComputation(): void {
    props.state.computation.set(computation === 'successively' ? 'parallel' : 'successively')
  }
}
