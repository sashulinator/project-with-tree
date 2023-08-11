import './editor.scss'

import { useEffect, useMemo } from 'react'
import uniqid from 'uniqid'

import { Decision } from '~/entities/decision'
import { Point } from '~/entities/point'
import { ActionHistory } from '~/utils/action-history'
import { Id, assertDefined, assertNotNull, c } from '~/utils/core'
import { getElementSize } from '~/utils/dom/get-element-size'
import { useEventListener } from '~/utils/hooks'

import {
  Canvas,
  CanvasState,
  DecisionPanel,
  LeftPanel,
  LinkListState,
  NodeListState,
  NodeState,
  RightPanel,
  State,
  getColumnX,
  historyListener,
} from '../'
import { addNodeClosure } from '../lib/-add-node-closure'
import { useKeyDownListener } from '../lib/-use-key-down-listener'

Editor.displayName = 'decision-Editor'

export interface Props {
  decision: Decision
  className?: string
}

export default function Editor(props: Props): JSX.Element {
  const rules = props.decision.rules || []
  const resizeBarClassName = 'resizeBar'
  const history = useMemo(() => new ActionHistory(), [])

  const state = useMemo(() => new State(props.decision), [])
  const canvasState = useMemo(() => new CanvasState(1, { x: -171, y: 431 }), [])
  const nodeListState = useMemo(() => new NodeListState(props.decision.data), [props.decision.data])
  const linkListState = useMemo(() => new LinkListState(rules), [rules])

  const addNode = addNodeClosure({ canvasState, nodeListState })

  useKeyDownListener({ resetSelection, removeSelected, previousHistory, nextHistory })
  useEventListener('click', onClick)

  useEffect(subscribeHistory, [history, state, nodeListState, linkListState])

  return (
    <div className={c(props.className, Editor.displayName)}>
      <DecisionPanel state={state} rootProps={{ className: 'panel --header' }} />
      <LeftPanel
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={centerNode}
        nodeListState={nodeListState}
        addNode={addNode}
      />
      <RightPanel
        className='panel --right'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__right`, defaultSize: 300 }}
        nodeListState={nodeListState}
      />
      <Canvas removeNode={removeNode} state={canvasState} nodeListState={nodeListState} linkListState={linkListState} />
    </div>
  )

  // Private

  function previousHistory(): void {
    history.previous()
  }

  function nextHistory(): void {
    history.next()
  }

  function subscribeHistory(): void {
    historyListener({ history, state, nodeListState, linkListState })
  }

  function resetSelection(): void {
    linkListState.editingId.set(undefined)
    nodeListState.selection.set(new Set())
  }

  function removeSelected(): void {
    nodeListState.selection.value.forEach((id) => {
      const state = nodeListState.get(id)
      if (state.point.type !== 'ENTER') {
        removeNode(id)
      }
    })
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
      nodeListState.selection.set(new Set())
    }
  }
}
