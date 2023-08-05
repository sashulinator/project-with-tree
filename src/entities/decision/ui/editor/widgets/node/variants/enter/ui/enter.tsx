import './enter.css'

import { Id } from '~/utils/dictionary'

import Node, { VariantPickerProps, Title, SourceLinks } from '../../..'
import { Toolbar } from '..'

import { useUpdate } from '~/utils/hooks'

Enter.displayName = 'decisionCanvas-w-Node-v-Enter'

/**
 * Node вариант filter
 */
export function Enter(props: VariantPickerProps): JSX.Element {
  const { remove, linkStates, ...nodeProps } = props
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
          linkMapperState={linkStates}
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
    if (props.linkStates.editingId.value) {
      props.linkStates.finishEditing(linkId)
    } else {
      props.linkStates.startEditing(linkId, props.state.id)
    }
  }

  function onNewJointClick(startLinkType: 'target' | 'source'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkStates.editingId.value) {
        props.linkStates.finishNewLink(props.state.id)
      } else {
        props.linkStates.startNewLink(props.state.id, newLinkId, startLinkType)
      }
    }
  }
}
