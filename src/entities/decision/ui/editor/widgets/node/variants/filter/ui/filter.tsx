import './filter.css'

import { Id } from '~/utils/dictionary'

import Node, { VariantPickerProps, Title, SourceLinks, TargetLinks } from '../../..'
import { Toolbar } from '..'

import { useUpdate } from '~/utils/hooks'

Filter.displayName = 'decisionCanvas-w-Node-v-Filter'

/**
 * Node вариант filter
 */
export default function Filter(props: VariantPickerProps): JSX.Element {
  const { remove, linkListState, state, ...nodeProps } = props
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      {...nodeProps}
      state={props.state}
      className={Filter.displayName}
      title={<Title state={props.state} />}
      toolbar={
        <Toolbar listState={props.nodeListState} state={props.state} remove={(): void => remove(props.state.id)} />
      }
      sourceLinks={
        <SourceLinks
          linkListState={linkListState}
          state={state}
          onNewJointClick={onNewJointClick('source')}
          onJointClick={onJointClick}
        />
      }
      targetLinks={
        <TargetLinks
          linkStates={linkListState}
          state={state}
          onNewJointClick={onNewJointClick('target')}
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
    if (props.linkListState.editingId.value) {
      props.linkListState.finishEditing(linkId)
    } else {
      props.linkListState.startEditing(linkId, props.state.id)
    }
  }

  function onNewJointClick(startLinkType: 'target' | 'source'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkListState.editingId.value) {
        props.linkListState.finishNewLink(props.state.id)
      } else {
        props.linkListState.startNewLink(props.state.id, newLinkId, startLinkType)
      }
    }
  }
}
