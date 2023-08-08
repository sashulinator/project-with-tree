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
  }

  function onGestureDrug(state: NodeState) {
    return (event: GestureDragEvent) => {
      event.event.stopPropagation()
      const movePosition = getNodeMovement(event, props.state.scale.value)

      if (movePosition === null) return

      let x = state.position.previous.x + movePosition.x
      const y = state.position.previous.y + movePosition.y

      if (!event.last) {
        state.position.move({ x, y }, { last: false })
        return
      }

      const xModulo = x % COLUMN_GAP
      const toLeft = xModulo < COLUMN_GAP / 2
      x = toLeft ? x - xModulo : x + COLUMN_GAP - xModulo

      const last = { ...state.position.previous }

      state.position.transitionMove({ x, y }, {}, function onEnd() {
        props.nodeListState.positionColumn(x)
        if (last.x === x) return
        props.nodeListState.positionColumn(last.x)
      })
    }
  }
}
