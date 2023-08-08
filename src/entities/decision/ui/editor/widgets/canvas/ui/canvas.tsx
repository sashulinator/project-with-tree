import { Board, GestureDragEvent, PaintingPanel } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { LinkListState, LinkList, NodeListState, NodeList, NodeState, getNodeMovement, COLUMN_GAP } from '../../..'
import { State } from '../'

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
          onGestureDrug={onGestureDrug}
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

  function onGestureDrug(state: NodeState) {
    return (event: GestureDragEvent) => {
      event.event.stopPropagation()
      const movePosition = getNodeMovement(event, props.state.scale.value)

      if (movePosition === null) return

      let x = state.position.start.x + movePosition.x
      const y = state.position.start.y + movePosition.y

      if (!event.last) {
        state.position.move({ x, y }, { last: false })
        return
      }

      const xModulo = x % COLUMN_GAP
      const toLeft = xModulo < COLUMN_GAP / 2
      x = toLeft ? x - xModulo : x + COLUMN_GAP - xModulo

      state.position.transitionMove({ x, y })
    }
  }
}
