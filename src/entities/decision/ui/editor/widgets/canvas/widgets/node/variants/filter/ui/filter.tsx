import './filter.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, TargetLinks, Title } from '../../..'
import { LinkController } from '../../../../..'

Filter.displayName = 'decision-Editor-w-Canvas-w-Node-v-Filter'

/**
 * Node вариант filter
 */
export default function Filter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      toggle={props.toggle}
      select={props.select}
      list={props.list}
      controller={props.controller}
      onGestureDrag={props.onGestureDrag}
      className={Filter.displayName}
      title={<Title className='title' controller={props.controller} />}
      toolbar={<Toolbar toggle={props.toggle} select={props.select} list={props.list} controller={props.controller} />}
      sourceLinks={
        <SourceLinks
          linkList={props.linkList}
          controller={props.controller}
          startLinkCreating={startLinkCreating('sourceId')}
          startLinkEditing={startLinkEditing}
          addLink={addLink}
        />
      }
      targetLinks={
        <TargetLinks
          linkControllers={props.linkList}
          state={props.controller}
          onNewJointClick={startLinkCreating('targetId')}
          onJointClick={startLinkEditing}
        />
      }
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

  function startLinkEditing(linkId: Id): void {
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

  function startLinkCreating(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkList.jointEditingId.value) {
        props.linkList.finishNew(props.controller.id)
      } else {
        props.linkList.startNew({ [startLinkType]: props.controller.id, id: newLinkId, index: 0 })
      }
    }
  }
}
