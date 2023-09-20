import './arbitration.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, TargetLinks, Title } from '../../..'
import { LinkController } from '../../../../..'

Filter.displayName = 'decision-Editor-w-Canvas-w-Node-v-Arbitration'

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
        index: props.linkList.getBySourceId(props.state.id).length,
      })
    )
  }

  function onJointClick(linkId: Id): void {
    if (props.linkList.jointEditingId.value) {
      props.linkList.finishJointEditing(linkId)
    } else {
      const linkController = props.linkList.get(linkId)
      if (!linkController.targetId.value) {
        props.linkList.jointEditingId.set(linkController.id)
      } else {
        props.linkList.startJointEditing(linkId, props.state.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkList.jointEditingId.value) {
        props.linkList.finishNew(props.state.id)
      } else {
        // console.log(startLinkType, newLinkId, props.state.id)
        props.linkList.startNew({ [startLinkType]: props.state.id, id: newLinkId, index: 0 })
      }
    }
  }
}
