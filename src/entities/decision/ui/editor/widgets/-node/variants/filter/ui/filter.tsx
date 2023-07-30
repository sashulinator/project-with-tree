import './filter.css'

import { Id } from '~/utils/dictionary'

import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'
import { Node } from '../../..'

import { LinkStateDictionary } from '../../../../_links'
import { NodeState } from '../../../../_node'

import Toolbar from '../widgets/toolbar'
import Title from '../../../widgets/title'
import SourceLink from '../../../widgets/source-links'
import TargetLink from '../../../widgets/target-links'

import { useUpdate } from '~/utils/hooks'

Filter.displayName = 'decisionCanvas-w-Node-v-Filter'

export interface FilterProps {
  state: NodeState
  linkStates: LinkStateDictionary
  remove: () => void
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Node вариант filter
 */
export function Filter(props: FilterProps): JSX.Element {
  const { remove, linkStates, state, ...nodeProps } = props
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      {...nodeProps}
      state={props.state}
      className={Filter.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} remove={remove} />}
      sourceLinks={
        <SourceLink
          linkStates={linkStates}
          state={state}
          onNewJointClick={onNewJointClick('source')}
          onJointClick={onJointClick}
        />
      }
      targetLinks={
        <TargetLink
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
