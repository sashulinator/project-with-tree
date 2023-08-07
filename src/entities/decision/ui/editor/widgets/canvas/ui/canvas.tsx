import { Board, GestureDragEvent, PaintingPanel } from '~/ui/canvas'
import { Id, assertNotNull } from '~/utils/core'
import { getStyle } from '~/utils/dom'
import { useUpdate } from '~/utils/hooks'

import {
  State as EditorState,
  LinkListState,
  LinkList,
  NodeListState,
  NodeList,
  NodeState,
  getNodeMovement,
} from '../../..'

interface CanvasProps {
  editorState: EditorState
  linkListState: LinkListState
  nodeListState: NodeListState
  removeNode: (id: Id) => void
}

export default function Canvas(props: CanvasProps): JSX.Element {
  useUpdate(updateOnEvents, [props.editorState])

  return (
    <Board ref={props.editorState.ref.set}>
      <PaintingPanel translate={props.editorState.translate.value} scale={props.editorState.scale.value}>
        <LinkList
          state={props.linkListState}
          nodeListState={props.nodeListState}
          canvasTranslate={props.editorState.translate.value}
          scale={props.editorState.scale.value}
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
    props.editorState.on('translate', update)
    props.editorState.on('scale', update)
  }

  function onGestureDrug(state: NodeState) {
    return (event: GestureDragEvent) => {
      event.event.stopPropagation()
      const GAP = 500
      const last = { ...state.position.last }
      const movePosition = getNodeMovement(event, props.editorState.scale.value)

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
