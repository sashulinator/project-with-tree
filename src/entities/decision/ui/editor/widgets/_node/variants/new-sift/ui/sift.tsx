import './sift.css'

import { Id } from '~/utils/dictionary'

import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'
import { NewNode } from '~/ui/canvas'

import { LinkStateDictionary } from '../../../../_links'
import { NodeState } from '../../..'

import Toolbar from '../widgets/toolbar'
import Title from '../widgets/title'
import SourceLink from '../widgets/source-links'
import TargetLink from '../widgets/target-links/ui/target-links'

import { useUpdate } from '~/utils/hooks'

NewSiftNode.displayName = 'decisionCanvas-w-Node-v-Sift'

export interface NewSiftNodeProps {
  state: NodeState
  linkStates: LinkStateDictionary
  dataId: Id
  remove: () => void
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Node типа sift
 */
export function NewSiftNode(props: NewSiftNodeProps): JSX.Element {
  const { remove, linkStates, state, ...nodeProps } = props
  useUpdate(subscribeOnUpdates)

  return (
    <NewNode
      {...nodeProps}
      x={state.position.value.x}
      y={state.position.value.y}
      className={NewSiftNode.displayName}
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
