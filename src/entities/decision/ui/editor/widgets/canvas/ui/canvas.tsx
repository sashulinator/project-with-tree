import { memo } from 'react'

import { Board, PaintingPanel } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { Controller, LinkList, LinkListController, NodeList, NodeListController } from '../'
import { onGestureDrag } from '../_private'

CanvasComponent.displayName = 'decision-Editor-w-Canvas'

export interface Props {
  controller: Controller
  linkListController: LinkListController
  nodeListController: NodeListController
  selectNodes: (ids: Id[]) => void
  removeNode: (id: Id) => void
}

function CanvasComponent(props: Props): JSX.Element {
  useUpdate(updateOnEvents, [props.controller])

  return (
    <Board ref={setRefs(props.controller.ref.set, props.controller.zoom.setRef)}>
      <PaintingPanel translate={props.controller.zoom.value} scale={props.controller.zoom.value.k}>
        <LinkList
          state={props.linkListController}
          nodeListController={props.nodeListController}
          canvasTranslate={props.controller.zoom.value}
          scale={props.controller.zoom.value.k}
        />
        <NodeList
          state={props.nodeListController}
          linkListController={props.linkListController}
          remove={props.removeNode}
          selectNodes={props.selectNodes}
          onGestureDrug={onGestureDrag(props.controller, props.nodeListController)}
        />
      </PaintingPanel>
    </Board>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.controller.on('zoom', update)

    props.nodeListController.on('position', (event) => {
      if (!event.last || event.isPositionColumn) return
      props.nodeListController.positionColumn(event.value.x)
      if (event.value.x === event.previousStart.x) return
      props.nodeListController.positionColumn(event.previousStart.x)
    })

    props.linkListController.on('targetId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeListController.find(event.item.sourceId.value)
        const tNodeState = props.nodeListController.find(event.item.targetId.value)
        tNodeState && props.nodeListController.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeListController.positionColumn(sNodeState?.position.value.x)
      })
    })

    props.linkListController.on('sourceId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeListController.find(event.item.sourceId.value)
        const tNodeState = props.nodeListController.find(event.item.targetId.value)
        tNodeState && props.nodeListController.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeListController.positionColumn(sNodeState?.position.value.x)
      })
    })
  }
}

const Canvas = memo(CanvasComponent)
Canvas.displayName = CanvasComponent.displayName
export default Canvas
