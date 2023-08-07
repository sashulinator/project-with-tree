import './enter.css'

import { Id } from '~/utils/dictionary'

import Node, { VariantPickerProps, Title, SourceLinks } from '../../..'
import { Toolbar } from '..'

import { useUpdate } from '~/utils/hooks'

Enter.displayName = 'decisionCanvas-w-Node-v-Enter'

/**
 * Node вариант filter
 */
export default function Enter(props: VariantPickerProps): JSX.Element {
  const { remove, linkListStates: linkStates, ...nodeProps } = props
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      {...nodeProps}
      className={Enter.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} remove={(): void => remove(props.state.id)} />}
      sourceLinks={
        <SourceLinks
          hideNewLink={true}
          linkListState={linkStates}
          state={props.state}
          onNewJointClick={onNewJointClick('source')}
          onJointClick={onJointClick}
        />
      }
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('position', update))
  }

  function onJointClick(linkId: Id): void {
    if (props.linkListStates.editingId.value) {
      props.linkListStates.finishEditing(linkId)
    } else {
      props.linkListStates.startEditing(linkId, props.state.id)
    }
  }

  function onNewJointClick(startLinkType: 'target' | 'source'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkListStates.editingId.value) {
        props.linkListStates.finishNewLink(props.state.id)
      } else {
        props.linkListStates.startNewLink(props.state.id, newLinkId, startLinkType)
      }
    }
  }
}
