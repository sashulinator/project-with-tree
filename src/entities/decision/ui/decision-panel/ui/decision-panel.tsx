import './decision-panel.css'

import Editable from '~/ui/editable'
import ThemeDropdown from '~/ui/theme-dropdown'
import { useUpdate } from '~/utils/hooks'

import { EditorState } from '../../editor'

interface DecisionPanelProps {
  state: EditorState
}

export default function DecisionPanel(props: DecisionPanelProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <div className='decision-DecisionPanel'>
      <div className='tools'>
        <ThemeDropdown />
      </div>

      <div className='name'>
        <Editable
          cannotBeEmpty={true}
          value={props.state.name.value}
          placeholder='Имя'
          onChange={(ev): void => props.state.name.set(ev.currentTarget.value)}
        />
      </div>
    </div>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('name', update))
  }
}
