import { memo } from 'react'

import { Board, PaintingPanel } from '~/ui/canvas'
import { Id, Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { Controller, LinkList, LinkListController, NodeList, NodeListController } from '../'
import { onGestureDrag } from '../_private'

CanvasComponent.displayName = 'decision-Editor-w-Canvas'

export interface Props {
  controller: Controller
  linkList: LinkListController
  nodeList: NodeListController
  transitionMoveNodes: (ids: Id[], position: Position) => void
  toggleLink: (id: Id) => void
  toggleNode: (id: Id) => void
  selectNodes: (ids: Id[]) => void
  selectLinks: (ids: Id[]) => void
}

function CanvasComponent(props: Props): JSX.Element {
  useUpdate(updateOnEvents, [props.controller])

  return (
    <Board ref={setRefs(props.controller.ref.set, props.controller.zoom.setRef)}>
      <PaintingPanel translate={props.controller.zoom.value} scale={props.controller.zoom.value.k}>
        <LinkList
          selectLinks={props.selectLinks}
          toggle={props.toggleLink}
          state={props.linkList}
          nodeList={props.nodeList}
          canvasTranslate={props.controller.zoom.value}
          scale={props.controller.zoom.value.k}
        />
        <NodeList
          toggle={props.toggleNode}
          state={props.nodeList}
          linkListController={props.linkList}
          selectNodes={props.selectNodes}
          onGestureDrug={onGestureDrag(props.controller, props.nodeList, props.transitionMoveNodes)}
        />
      </PaintingPanel>
    </Board>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.controller.on('zoom', update)

    props.nodeList.on('position', (event) => {
      if (!event.last || event.isPositionColumn) return
      props.nodeList.positionColumn(event.value.x)
      if (event.value.x === event.previousStart.x) return
      props.nodeList.positionColumn(event.previousStart.x)
    })

    props.linkList.on('targetId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeList.find(event.item.sourceId.value)
        const tNodeState = props.nodeList.find(event.item.targetId.value)
        tNodeState && props.nodeList.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeList.positionColumn(sNodeState?.position.value.x)
      })
    })

    props.linkList.on('sourceId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeList.find(event.item.sourceId.value)
        const tNodeState = props.nodeList.find(event.item.targetId.value)
        tNodeState && props.nodeList.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeList.positionColumn(sNodeState?.position.value.x)
      })
    })
  }
}

const Canvas = memo(CanvasComponent)
Canvas.displayName = CanvasComponent.displayName
export default Canvas
