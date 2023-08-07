import './editor.css'

import { useMemo } from 'react'

import uniqid from 'uniqid'

import { Decision } from '~/entities/decision'
import { State, PointPanel, DecisionPanel, LinkListState, NodeListState, NodeState } from '../'
import { Point } from '~/entities/point'

import { ActionHistory } from '~/utils/action-history'
import { Id, assertDefined, c } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'

import Canvas from '../widgets/canvas/ui/canvas'

Editor.displayName = 'decision-Editor'

export interface Props {
  decision: Decision
  className?: string
}

export default function Editor(props: Props): JSX.Element {
  const rules = props.decision.rules || []

  const history = useMemo(() => new ActionHistory(), [])

  const editorState = useMemo(() => new State({ translate: { x: 0, y: 0 }, scale: 1, decision: props.decision }), [])
  const nodeListState = useMemo(() => new NodeListState(props.decision.data), [props.decision.data])
  const linkListState = useMemo(() => new LinkListState(rules), [rules])

  useEventListener('keydown', onKeyDown)

  return (
    <div className={c(props.className, Editor.displayName)}>
      <DecisionPanel state={editorState} rootProps={{ className: 'decisionPanel panel' }} />
      <PointPanel
        centerNode={centerNode}
        nodeStates={nodeListState}
        addNode={addNode}
        rootProps={{ className: 'panel itemsPanel' }}
      />
      <Canvas
        removeNode={removeNode}
        editorState={editorState}
        nodeListState={nodeListState}
        linkListState={linkListState}
      />
    </div>
  )

  // Private

  function removeNode(id: Id): void {
    nodeListState.remove(id)

    linkListState.values().forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      linkListState.remove(s.id)
    })
  }

  function addNode(): void {
    const rect = editorState.ref.value?.getBoundingClientRect()
    assertDefined(rect)
    const point: Point = {
      type: 'SIFT',
      id: uniqid(),
      computation: 'successively',
      name: 'new',
      x: -editorState.translate.value.x + rect?.width / 2 - 200,
      y: -editorState.translate.value.y + rect?.height / 2 - 150,
    }
    nodeListState.add(new NodeState(point))
  }

  function centerNode(id: Id): void {
    const nodeState = nodeListState.get(id)
    const rect = nodeState.ref.value?.getBoundingClientRect()
    assertDefined(rect)
    const mx = -nodeState.position.value.x + window.innerWidth / 2 - rect.width / 2
    const my = -nodeState.position.value.y + window.innerHeight / 2 - rect.height / 2
    editorState.d3zoom.setTranslate({ x: mx, y: my })
  }

  function onKeyDown(ev: KeyboardEvent): void {
    if (!ev.metaKey || ev.key !== 'z') return

    if (ev.shiftKey) {
      history.next()
    } else {
      history.previous()
    }
  }
}
