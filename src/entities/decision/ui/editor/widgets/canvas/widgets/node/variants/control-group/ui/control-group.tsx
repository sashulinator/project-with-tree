import './control-group.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, TargetLinks, Title } from '../../..'
import { LinkController } from '../../../../..'

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
          linkList={props.linkList}
          state={props.state}
          startLinkCreating={onNewJointClick('sourceId')}
          startLinkEditing={onJointClick}
          addLink={addLink}
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

  function addLink(): void {
    props.linkList.add(
      new LinkController({
        sourceId: props.state.id,
        targetId: undefined,
        rules: [],
        index: props.linkList.getLinksBySourceId(props.state.id).length,
      })
    )
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
