import { Board, PaintingPanel } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { State } from '../'
import { LinkList, LinkListState, NodeList, NodeListState, NodeState, getColumnX, getNodeMovement } from '../../..'
import { onGestureDrag } from '../lib/on-gesture-drag'

export interface Props {
  state: State
  linkListState: LinkListState
  nodeListState: NodeListState
  removeNode: (id: Id) => void
}

export default function Canvas(props: Props): JSX.Element {
  useUpdate(updateOnEvents, [props.state])

  return (
    <Board ref={props.state.ref.set}>
      <PaintingPanel translate={props.state.translate.value} scale={props.state.scale.value}>
        <LinkList
          state={props.linkListState}
          nodeListState={props.nodeListState}
          canvasTranslate={props.state.translate.value}
          scale={props.state.scale.value}
        />
        <NodeList
          state={props.nodeListState}
          linkListState={props.linkListState}
          remove={props.removeNode}
          onGestureDrug={onGestureDrag(props.state, props.nodeListState)}
        />
      </PaintingPanel>
    </Board>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.state.on('translate', update)
    props.state.on('scale', update)

    props.nodeListState.on('position', (event) => {
      if (!event.last || event.isPositionColumn) return
      props.nodeListState.positionColumn(event.value.x)
      if (event.value.x === event.previousStart.x) return
      props.nodeListState.positionColumn(event.previousStart.x)
    })

    props.linkListState.on('targetId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeListState.find(event.state.sourceId.value)
        const tNodeState = props.nodeListState.find(event.state.targetId.value)
        tNodeState && props.nodeListState.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeListState.positionColumn(sNodeState?.position.value.x)
      })
    })

    props.linkListState.on('sourceId', (event) => {
      setTimeout(() => {
        const sNodeState = props.nodeListState.find(event.state.sourceId.value)
        const tNodeState = props.nodeListState.find(event.state.targetId.value)
        tNodeState && props.nodeListState.positionColumn(tNodeState?.position.value.x)
        sNodeState && props.nodeListState.positionColumn(sNodeState?.position.value.x)
      })
    })
  }
}
