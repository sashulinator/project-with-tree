import './main.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, Title } from '../../..'
import { LinkController } from '../../../../..'

Main.displayName = 'decisionCanvas-w-Node-v-Main'

/**
 * Node вариант filter
 */
export default function Main(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      toggle={props.toggle}
      select={props.select}
      list={props.list}
      onGestureDrag={props.onGestureDrag}
      controller={props.controller}
      className={Main.displayName}
      title={<Title controller={props.controller} />}
      toolbar={<Toolbar controller={props.controller} />}
      sourceLinks={
        <SourceLinks
          linkList={props.linkList}
          controller={props.controller}
          startLinkCreating={onNewJointClick('sourceId')}
          startLinkEditing={onJointClick}
          addLink={addLink}
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
        props.linkList.startNew({ [startLinkType]: props.controller.id, id: newLinkId, index: 0 })
      }
    }
  }
}
