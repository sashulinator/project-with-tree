import './arbitration.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, TargetLinks, Title } from '../../..'
import { Controller as LinkController } from '../../../../edge'

Filter.displayName = 'decision-Editor-w-Canvas-w-Node-v-Arbitration'

/**
 * Node вариант filter
 */
export default function Filter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      className={Filter.displayName}
      controller={props.controller}
      list={props.list}
      title={<Title className='title' controller={props.controller} />}
      toolbar={<Toolbar toggle={props.toggle} select={props.select} list={props.list} controller={props.controller} />}
      sourceLinks={
        <SourceLinks
          linkList={props.linkList}
          controller={props.controller}
          startLinkCreating={onNewJointClick('sourceId')}
          startLinkEditing={onJointClick}
          addLink={addLink}
        />
      }
      targetLinks={
        <TargetLinks
          linkControllers={props.linkList}
          state={props.controller}
          onNewJointClick={onNewJointClick('targetId')}
          onJointClick={onJointClick}
        />
      }
      toggle={props.toggle}
      select={props.select}
      onGestureDrag={props.onGestureDrag}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('position', update))
  }

  function addLink(): void {
    props.linkList.add(
      new LinkController({
        sourceId: props.controller.id,
        targetId: undefined,
        rules: [],
        index: props.linkList.getBySourceId(props.controller.id).length,
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
        props.linkList.startJointEditing(linkId, props.controller.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkList.jointEditingId.value) {
        props.linkList.finishNew(props.controller.id)
      } else {
        // console.log(startLinkType, newLinkId, props.state.id)
        props.linkList.startNew({ [startLinkType]: props.controller.id, id: newLinkId, index: 0 })
      }
    }
  }
}
