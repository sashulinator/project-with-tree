import './editor.css'

import { useEffect, useMemo } from 'react'
import uniqid from 'uniqid'

import { Decision } from '~/entities/decision'
import { Point } from '~/entities/point'
import { ActionHistory } from '~/utils/action-history'
import { Id, assertDefined, assertNotNull, c } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'

import {
  State,
  PointPanel,
  DecisionPanel,
  LinkListState,
  NodeListState,
  NodeState,
  Canvas,
  CanvasState,
  historyListener,
  getColumnX,
} from '../'

import { getElementSize } from '~/utils/dom/get-element-size'

Editor.displayName = 'decision-Editor'

export interface Props {
  decision: Decision
  className?: string
}

export default function Editor(props: Props): JSX.Element {
  const rules = props.decision.rules || []

  const history = useMemo(() => new ActionHistory(), [])

  const state = useMemo(() => new State(props.decision), [])
  const canvasState = useMemo(() => new CanvasState(1, { x: -171, y: 431 }), [])
  const nodeListState = useMemo(() => new NodeListState(props.decision.data), [props.decision.data])
  const linkListState = useMemo(() => new LinkListState(rules), [rules])

  useEventListener('keydown', onKeyDown)
  useEventListener('click', onClick)
  useEffect(subscribeHistory, [history, state, nodeListState, linkListState])

  return (
    <div className={c(props.className, Editor.displayName)}>
      <DecisionPanel state={state} rootProps={{ className: 'decisionPanel panel' }} />
      <PointPanel
        centerNode={centerNode}
        nodeListState={nodeListState}
        addNode={addNode}
        rootProps={{ className: 'panel itemsPanel' }}
      />
      <Canvas removeNode={removeNode} state={canvasState} nodeListState={nodeListState} linkListState={linkListState} />
    </div>
  )

  // Private

  function subscribeHistory(): void {
    historyListener({ history, state, nodeListState, linkListState })
  }

  function removeNode(id: Id): void {
    const x = nodeListState.get(id).position.value.x
    nodeListState.remove(id)
    setTimeout(() => nodeListState.positionColumn(x))
    linkListState.values().forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      linkListState.remove(s.id)
    })
  }

  function addNode(): void {
    const rect = canvasState.ref.value?.getBoundingClientRect()
    assertDefined(rect)
    const point: Point = {
      type: 'SIFT',
      id: uniqid(),
      computation: 'successively',
      name: 'new',
      x: -canvasState.translate.value.x + rect?.width / 2 - 200,
      y: -canvasState.translate.value.y + rect?.height / 2 - 150,
    }
    const nodeState = new NodeState(point)
    nodeListState.add(nodeState)

    setTimeout(() => {
      nodeState.position.transitionMove({ x: getColumnX(nodeState.position.value.x), y: nodeState.position.value.y })
    })
  }

  function centerNode(id: Id): void {
    const nodeState = nodeListState.get(id)
    assertNotNull(nodeState.ref.value)
    assertNotNull(canvasState.ref.value)
    const nodeSize = getElementSize(nodeState.ref.value)
    const canvasSize = getElementSize(canvasState.ref.value)
    const mx = -nodeState.position.value.x + canvasSize.width / 2 - nodeSize.width / 2
    const my = -nodeState.position.value.y + canvasSize.height / 2 - nodeSize.height / 2
    canvasState.d3zoom.setTranslate({ x: mx, y: my })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName === 'path' || el.tagName === 'svg') {
      linkListState.editingId.set(undefined)
    }
  }

  function onKeyDown(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      linkListState.editingId.set(undefined)
      nodeListState.selection.set(new Set())
    }

    if (ev.key === 'Backspace') {
      nodeListState.selection.value.forEach((id) => {
        const state = nodeListState.get(id)
        if (state.point.type !== 'ENTER') {
          nodeListState.remove(id)
        }
      })
    }

    if (ev.metaKey && ev.key === 'z') {
      if (ev.shiftKey) {
        history.next()
      } else {
        history.previous()
      }
    }
  }
}
