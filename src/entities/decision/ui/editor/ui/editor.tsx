import './editor.css'

import { useEffect, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import uuid from 'uuid-random'

import { PaintingPanel } from '~/abstract/canvas'
import { Decision, EditorState } from '~/entities/decision'
import { NodeState, Point } from '~/entities/point'
import { RuleLinkState } from '~/entities/rule'
import { Board } from '~/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { Id, assertDefined } from '~/utils/core'
import { useBoolean, useEventListener, useOnMount, useUpdate } from '~/utils/hooks'

import { listenHistory } from '../lib/_listen-history'
import DecisionPanel from '../widgets/_decision-panel'
import ItemPanel from '../widgets/_items-panel'
import { Links } from '../widgets/_links'
import { LinkStateDictionary } from '../widgets/_links/state/state'
import { Nodes } from '../widgets/_nodes'
import { NodeStateDictionary } from '../widgets/_nodes/state/state'

interface EditorProps {
  decision: Decision
}

export function Editor(props: EditorProps): JSX.Element {
  const [isRenderLinks, setIsRenderLinks] = useBoolean(false)
  useOnMount(setIsRenderLinks)
  const rules = props.decision.rules || []

  const history = useMemo(() => new ActionHistory(), [])

  const editorState = useMemo(
    () => new EditorState({ translate: { x: 0, y: 0 }, scale: 1, decision: props.decision }),
    []
  )

  const linkStateList = useMemo(() => rules?.map((rule) => new RuleLinkState({ id: rule.id, rule })), [])

  const nodeStateList = useMemo(() => props.decision.data.map((point) => new NodeState({ point })), [])

  const linkStates = useMemo(() => new LinkStateDictionary(linkStateList), [linkStateList])

  const nodeStates = useMemo(() => new NodeStateDictionary(nodeStateList), [])

  useUpdate(updateOnEvents, [linkStates])

  useEventListener('keydown', onKeyDown)

  useEffect(() => {
    editorState.onAll((eventName, events) => listenHistory(history, editorState, eventName, events))
  }, [])

  return (
    <div className='decision-Editor'>
      <DndProvider backend={HTML5Backend}>
        <DecisionPanel state={editorState} />
        <ItemPanel centerNode={centerNode} nodeStateList={nodeStateList} addNode={addNode} />
        <Board state={editorState}>
          <PaintingPanel translate={editorState.translate.value} scale={editorState.scale.value}>
            {isRenderLinks && (
              <Links
                canvasTranslate={editorState.translate.value}
                scale={editorState.scale.value}
                linkStates={linkStates}
                nodeStates={nodeStates}
              />
            )}
            <Nodes scale={editorState.scale.value} linkStates={linkStates} nodeStates={nodeStates} />
          </PaintingPanel>
        </Board>
      </DndProvider>
    </div>
  )

  // Private

  function addNode(): void {
    const rect = editorState.ref.value?.getBoundingClientRect()
    assertDefined(rect)
    const point: Point = {
      type: 'SIFT',
      id: uuid(),
      computation: 'successively',
      name: 'new',
      x: -editorState.translate.value.x + rect?.width / 2 - 200,
      y: -editorState.translate.value.y + rect?.height / 2 - 150,
    }
    nodeStates.add(new NodeState({ point }))
  }

  function centerNode(id: Id): void {
    const nodeState = nodeStates.get(id)
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

  function updateOnEvents(update: () => void): void {
    editorState.on('translate', update)
    editorState.on('scale', update)
    // ЧТО ТУТ ПРОИСХОДИЛО??
    // nodeStates.onAll(() => {
    //   const svg = document.querySelector<SVGSVGElement>('svg')
    //   document.body.style.width = `100.0${Math.random()}%`
    // })
  }
}

Editor.displayName = 'DecisionEditor'
