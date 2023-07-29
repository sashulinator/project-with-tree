import { GhostButton } from '~/ui/button'
import { Trash } from '~/ui/icon'

import { State } from '../../../../../models/state'
import { useUpdate } from '~/utils/hooks'

interface ToolbarProps {
  state: State
  remove: () => void
}

export default function Toolbar(props: ToolbarProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const computation = props.state.computation.value

  return (
    <>
      <GhostButton onClick={toogleComputation} style={{ fontSize: '0.6em' }}>
        {computation}
      </GhostButton>
      <GhostButton onClick={props.remove} round={true}>
        <Trash />
      </GhostButton>
    </>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
  }

  function toogleComputation(): void {
    props.state.computation.set(computation === 'successively' ? 'parallel' : 'successively')
  }
}
