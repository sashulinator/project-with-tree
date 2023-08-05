import './filter.css'

import { Id } from '~/utils/dictionary'

import Node, { VariantPickerProps, Title, SourceLinks, TargetLinks } from '../../..'
import { Toolbar } from '..'

import { useUpdate } from '~/utils/hooks'

Filter.displayName = 'decisionCanvas-w-Node-v-Filter'

/**
 * Node вариант filter
 */
export function Filter(props: VariantPickerProps): JSX.Element {
  const { remove, linkStates, state, ...nodeProps } = props
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
          linkMapperState={linkStates}
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
