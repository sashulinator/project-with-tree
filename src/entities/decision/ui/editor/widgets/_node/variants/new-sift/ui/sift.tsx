import './sift.css'

import { Id } from '~/utils/dictionary'

import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'
import { Joint, NewNode } from '~/ui/canvas'
import { GhostButton } from '~/ui/button'

import { LinkStateDictionary } from '../../../../_links'
import { NodeState } from '../../..'

import Toolbar from '../widgets/toolbar'
import Title from '../widgets/title'
import SourceLink from '../widgets/source-links'
import TargetLink from '../widgets/target-links/ui/target-links'
import { RuleLinkState } from '../../../../_link'
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
      sourceLinks={<SourceLink linkStates={linkStates} state={state} onNewJointClick={onNewJointClick} />}
      targetLinks={<TargetLink linkStates={linkStates} state={state} onNewJointClick={onNewJointClick} />}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('position', update))
  }

  function onNewJointClick(newLink: RuleLinkState): void {
    const editingLinkState = props.linkStates.findEditingLinkState()

    if (!editingLinkState) {
      props.linkStates.add(newLink)
      props.linkStates.editingId.value = newLink.id
      return
    }

    if (editingLinkState.sourceId.value) {
      editingLinkState.targetId.value = props.state.id
    } else {
      editingLinkState.sourceId.value = props.state.id
    }

    props.linkStates.editingId.value = undefined
  }
}
