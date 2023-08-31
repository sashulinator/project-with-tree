import { memo } from 'react'

import { Board, PaintingPanel } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { Controller, LinkList, LinkListController, NodeList, NodeListState } from '../'
import { onGestureDrag } from '../_private'

CanvasComponent.displayName = 'decision-Editor-w-Canvas'

export interface Props {
  controller: Controller
  linkListState: LinkListController
  nodeListState: NodeListState
  selectNodes: (ids: Id[]) => void
  removeNode: (id: Id) => void
}

function CanvasComponent(props: Props): JSX.Element {
  useUpdate(updateOnEvents, [props.controller])

  return (
    <Board ref={setRefs(props.controller.ref.set, props.controller.zoom.setRef)}>
      <PaintingPanel translate={props.controller.zoom.value} scale={props.controller.zoom.value.k}>
        <LinkList
          state={props.linkListState}
          nodeListState={props.nodeListState}
          canvasTranslate={props.controller.zoom.value}
          scale={props.controller.zoom.value.k}
        />
        <NodeList
          state={props.nodeListState}
          linkListState={props.linkListState}
          remove={props.removeNode}
          selectNodes={props.selectNodes}
          onGestureDrug={onGestureDrag(props.controller, props.nodeListState)}
        />
      </PaintingPanel>
    </Board>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.controller.on('zoom', update)

    props.nodeListState.on('position', (event) => {
      if (!event.last || event.isPositionColumn) return
      props.nodeListState.positionColumn(event.value.x)
      if (event.value.x === event.previousStart.x) return
      props.nodeListState.positionColumn(event.previousStart.x)
    })

    props.linkListState.on('targetId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeListState.find(event.item.sourceId.value)
        const tNodeState = props.nodeListState.find(event.item.targetId.value)
        tNodeState && props.nodeListState.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeListState.positionColumn(sNodeState?.position.value.x)
      })
    })

    props.linkListState.on('sourceId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeListState.find(event.item.sourceId.value)
        const tNodeState = props.nodeListState.find(event.item.targetId.value)
        tNodeState && props.nodeListState.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeListState.positionColumn(sNodeState?.position.value.x)
      })
    })
  }
}

const Canvas = memo(CanvasComponent)
Canvas.displayName = CanvasComponent.displayName
export default Canvas
