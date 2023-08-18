import './editor.scss'

import { useEffect, useMemo } from 'react'

import { Decision } from '~/entities/decision'
import { ActionHistory } from '~/utils/action-history'
import { c } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'

import {
  Canvas,
  CanvasState,
  Header,
  LeftPanel,
  LinkListState,
  NodeListState,
  RightPanel,
  State,
  historyListener,
} from '../'
import {
  addNode as addNodeBind,
  centerNode as centerNodeBind,
  copySelectedNodes as copySelectedNodesBind,
  cutSelectedNodes as cutSelectedNodesBind,
  nextHistory as nextHistoryBind,
  paste as pasteBind,
  pasteFromClipboard as pasteFromClipboardBind,
  previousHistory as previousHistoryBind,
  removeNode as removeNodeBind,
  removeSelectedNodes as removeSelectedNodesBind,
  resetAll as resetAllBind,
  useKeyDownListener,
} from '../_private'

Editor.displayName = 'decision-Editor'

const resizeBarClassName = 'resizeBar'

export interface Props {
  decision: Decision
  className?: string
}

export default function Editor(props: Props): JSX.Element {
  // const rules = props.decision.rules || []
  const history = useMemo(() => new ActionHistory(), [])

  const state = useMemo(() => new State(props.decision), [])
  const canvasState = useMemo(() => new CanvasState(), [])
  const nodeListState = useMemo(() => new NodeListState(props.decision.decisionTree), [props.decision.decisionTree])
  const linkListState = useMemo(() => new LinkListState([]), [])

  const previousHistory = previousHistoryBind(history)
  const nextHistory = nextHistoryBind(history)
  const removeNode = removeNodeBind({ linkListState, nodeListState })
  const addNode = addNodeBind({ canvasState, nodeListState })
  const removeSelectedNodes = removeSelectedNodesBind({ nodeListState, removeNode })
  const centerNode = centerNodeBind({ nodeListState, canvasState })
  const copySelectedNodes = copySelectedNodesBind({ nodeListState })
  const cutSelectedNodes = cutSelectedNodesBind({ nodeListState })
  const pasteFromClipboard = pasteFromClipboardBind({ nodeListState, addNode })
  const paste = pasteBind({ nodeListState, canvasState, pasteFromClipboard })
  const resetAll = resetAllBind({ linkListState, nodeListState })

  useKeyDownListener({
    resetAll,
    removeSelectedNodes,
    previousHistory,
    nextHistory,
    copySelectedNodes,
    paste,
    cutSelectedNodes,
  })
  useEventListener('click', onClick)

  useEffect(subscribeHistory, [history, state, nodeListState, linkListState])

  return (
    <div className={c(props.className, Editor.displayName)}>
      <Header state={state} className='panel --header' />
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

  function subscribeHistory(): void {
    historyListener({ history, state, nodeListState, linkListState })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName === 'path' || el.tagName === 'svg') {
      linkListState.editingId.set(undefined)
      nodeListState.selection.set([])
    }
  }
}
