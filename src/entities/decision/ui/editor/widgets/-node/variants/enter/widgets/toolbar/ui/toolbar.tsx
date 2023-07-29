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

  return <></>

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
  }
}
