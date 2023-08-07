import { Board, GestureDragEvent, PaintingPanel } from '~/ui/canvas'
import { Id, assertNotNull } from '~/utils/core'
import { getStyle } from '~/utils/dom'
import { useUpdate } from '~/utils/hooks'

import { LinkListState, LinkList, NodeListState, NodeList, NodeState, getNodeMovement } from '../../..'
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
      const GAP = 500
      const last = { ...state.position.last }
      const movePosition = getNodeMovement(event, props.state.scale.value)

      if (movePosition === null) return

      let x = state.position.last.x + movePosition.x
      const y = state.position.last.y + movePosition.y

      if (!event.last) {
        state.position.move(x, y, false)
        return
      }

      const xModulo = x % GAP
      const toLeft = xModulo < GAP / 2
      x = toLeft ? x - xModulo : x + GAP - xModulo

      state.position.transitionedMove(x, y, () => {
        setTimeout(() => {
          gridDepth(x)
          if (last.x !== x) {
            gridDepth(last.x)
          }
        })
      })
    }
  }

  function gridDepth(x: number): void {
    const depthNodes = props.nodeListState
      .values()
      .filter((state) => state.position.value.x === x)
      .sort((a, b) => a.position.value.y - b.position.value.y)

    const YGAP = 50

    const nodesHeight = depthNodes.reduce((acc, state) => {
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      const height = parseInt(style.height, 10)
      acc += height
      return acc
    }, 0)

    const depthHeight = nodesHeight + depthNodes.length * YGAP
    const depthTop = depthHeight / -2

    let nextY = depthTop

    depthNodes.forEach((state) => {
      state.position.transitionedMove(state.position.value.x, nextY)
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      const height = parseInt(style.height, 10)
      nextY += height + YGAP
    })
  }
}
