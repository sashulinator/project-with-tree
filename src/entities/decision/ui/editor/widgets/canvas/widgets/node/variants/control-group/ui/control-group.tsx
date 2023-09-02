import './control-group.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, TargetLinks, Title } from '../../..'

Filter.displayName = 'decision-Editor-w-Canvas-w-Node-v-ControlGroup'

/**
 * Node вариант filter
 */
export default function Filter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      toggle={props.toggle}
      selectNodes={props.selectNodes}
      list={props.nodeList}
      state={props.state}
      onGestureDrug={props.onGestureDrug}
      className={Filter.displayName}
      title={<Title className='title' state={props.state} />}
      toolbar={
        <Toolbar toggle={props.toggle} selectNodes={props.selectNodes} listState={props.nodeList} state={props.state} />
      }
      sourceLinks={
        <SourceLinks
          linkListController={props.linkList}
          state={props.state}
          onNewJointClick={onNewJointClick('sourceId')}
          onJointClick={onJointClick}
        />
      }
      targetLinks={
        <TargetLinks
          linkControllers={props.linkList}
          state={props.state}
          onNewJointClick={onNewJointClick('targetId')}
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
    if (props.linkList.editingId.value) {
      props.linkList.finishEditing(linkId)
    } else {
      const linkController = props.linkList.get(linkId)
      if (!linkController.targetId.value) {
        props.linkList.editingId.set(linkController.id)
      } else {
        props.linkList.startEditing(linkId, props.state.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkList.editingId.value) {
        props.linkList.finishNewLink(props.state.id)
      } else {
        props.linkList.startNewLink({ [startLinkType]: props.state.id, id: newLinkId, index: 0 })
      }
    }
  }
}
