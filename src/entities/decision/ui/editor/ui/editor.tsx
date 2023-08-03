import './editor.css'

import { useEffect, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import uuid from 'uuid-random'

import { PaintingPanel } from '~/abstract/canvas'
import { Decision, EditorState } from '~/entities/decision'
import { Point } from '~/entities/point'
import { NodeState } from '../widgets/_node'
import { RuleLinkState } from '../widgets/_link'
import { emitter } from '~/shared/emitter'
import { Board } from '~/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { Id, assertDefined } from '~/utils/core'
import { useBoolean, useEventListener, useOnMount, useUpdate } from '~/utils/hooks'

import { listenHistory } from '../lib/_listen-history'
import { dark } from '../themes/dark'
import { light } from '../themes/light'
import DecisionPanel from '../widgets/_decision-panel'
import ItemPanel from '../widgets/_items-panel'
import { Links } from '../widgets/_links'
import { LinkStateDictionary } from '../widgets/_links/state/state'
import { Nodes } from '../widgets/_nodes'
import { Dictionary } from '~/utils/emitter'
import { Prop } from '~/utils/notifier'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

emitter.emit('addTheme', { dark, light })

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

  const nodeStates = useMemo(buildNodeStates, [props.decision.data])

  const selection = useMemo(() => new Prop([] as Id[]), [])

  const linkStates = useMemo(() => new LinkStateDictionary(linkStateList), [linkStateList])

  useUpdate(updateOnEvents, [linkStates])

  useEventListener('keydown', onKeyDown)

  useEffect(() => {
    editorState.onAll((eventName, events) => listenHistory(history, editorState, eventName, events))
  }, [])

  return (
    <div className='decision-Editor'>
      <DndProvider backend={HTML5Backend}>
        <DecisionPanel state={editorState} rootProps={{ className: 'decisionPanel panel' }} />
        <ItemPanel
          centerNode={centerNode}
          nodeStates={nodeStates}
          addNode={addNode}
          rootProps={{ className: 'panel itemsPanel' }}
        />
        <Board ref={editorState.ref.set}>
          <PaintingPanel translate={editorState.translate.value} scale={editorState.scale.value}>
            {isRenderLinks && (
              <Links
                canvasTranslate={editorState.translate.value}
                scale={editorState.scale.value}
                linkStates={linkStates}
                nodeStates={nodeStates}
              />
            )}
            <Nodes
              selection={selection}
              scale={editorState.scale.value}
              linkStates={linkStates}
              nodeStates={nodeStates}
              remove={removeNode}
              onGestureDrug={onGestureDrug}
            />
          </PaintingPanel>
        </Board>
      </DndProvider>
    </div>
  )

  // Private

  function onGestureDrug(state: NodeState) {
    return (event: GestureDragEvent) => {
      event.event.stopPropagation()
      const GAP = 500
      const isIdle = event.movement[0] === 0 && event.movement[1] === 0
      if (isIdle) return

      const moveX = event.movement[0] / editorState.scale.value
      const moveY = event.movement[1] / editorState.scale.value
      let x = state.position.last.x + moveX
      const y = state.position.last.y + moveY

      if (event.last) {
        const rx = x % GAP
        x = rx < GAP / 2 ? x - rx : x + GAP - rx
      }

      state.position.move(x, y, event.last)
    }
  }

  function buildNodeStates(): Dictionary<NodeState> {
    const nodeStateList = props.decision.data.map((point) => new NodeState({ point }))
    return new Dictionary(nodeStateList, (item) => item.id.toString())
  }

  function removeNode(id: Id): void {
    nodeStates.remove(id)

    linkStateList.forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      linkStates.remove(s.id)
    })
  }

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

  // gridDepth = (x: number): void => {
  //   const depthNodes = this.values()
  //     .filter((state) => state.position.value.x === x)
  //     .sort((a, b) => a.position.value.y - b.position.value.y)

  //   const nodesHeight = depthNodes.reduce((acc, state) => {
  //     const style = getStyle(state.ref.value)
  //     assertNotNull(style)
  //     acc += parseInt(style.height, 10)
  //     return acc
  //   }, 0)

  //   const depthHeight = nodesHeight + depthNodes.length * YGAP
  //   const depthTop = depthHeight / -2

  //   let nextY = depthTop

  //   depthNodes.forEach((state) => {
  //     state.position.value = { ...state.position.value, y: nextY }
  //     const style = getStyle(state.ref.value)
  //     assertNotNull(style)
  //     const height = parseInt(style.height, 10)
  //     nextY += height + YGAP
  //   })
  // }
}

Editor.displayName = 'DecisionEditor'
