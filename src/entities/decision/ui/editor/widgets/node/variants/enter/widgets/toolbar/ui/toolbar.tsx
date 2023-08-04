import './toolbar.css'
import { c } from '~/utils/core'
import { State } from '../../../../../state/state'
import { useUpdate } from '~/utils/hooks'

Toolbar.displayName = 'decisionEditor-ui-Canvas-w-Node-v-Enter-w-Toolbar'

interface ToolbarProps {
  className?: string
  state: State
  remove: () => void
}

export default function Toolbar(props: ToolbarProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  // Пока что пусто
  return <div className={c(props.className, Toolbar.displayName)}></div>

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
  }
}
