import './toolbar.css'

import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '../../../../..'

Toolbar.displayName = 'decision-Editor-w-Canvas-w-Node-v-Enter-w-Toolbar'

export interface Props {
  className?: string
  state: Controller
}

export default function Toolbar(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  // Пока что пусто
  return <div className={c(props.className, Toolbar.displayName)}></div>

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('computation', update))
  }
}
