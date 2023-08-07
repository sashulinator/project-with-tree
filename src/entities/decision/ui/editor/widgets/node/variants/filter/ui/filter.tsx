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
  const { remove, linkListStates: linkStates, state, ...nodeProps } = props
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      {...nodeProps}
      state={props.state}
      className={Filter.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar selection={props.selection} state={props.state} remove={(): void => remove(props.state.id)} />}
      sourceLinks={
        <SourceLinks
          linkListState={linkStates}
          state={state}
          onNewJointClick={onNewJointClick('source')}
          onJointClick={onJointClick}
        />
      }
      targetLinks={
        <TargetLinks
          linkStates={linkStates}
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
