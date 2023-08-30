import './editor.scss'

import { useEffect, useMemo } from 'react'

import { RulesRes } from '~/entities/rules/types/rules-type'
import { ActionHistory } from '~/utils/action-history'
import { c } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'

import {
  Canvas,
  CanvasState,
  Controller,
  Decision,
  Header,
  LeftPanel,
  LinkListState,
  NodeListState,
  RightPanel,
  Toolbar,
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
  ruleList: RulesRes[]
  onSubmit: (states: {
    editorManager: Controller
    canvasState: CanvasState
    nodeListState: NodeListState
    linkListState: LinkListState
  }) => void
}

export default function Editor(props: Props): JSX.Element {
  // const rules = props.decision.rules || []
  const history = useMemo(() => new ActionHistory(), [props.decision.decisionTree])

  const controller = useMemo(() => new Controller(props.decision), [props.decision.decisionTree])
  const canvasState = useMemo(() => new CanvasState(), [props.decision.decisionTree])
  const nodeListState = useMemo(() => new NodeListState(props.decision.decisionTree), [props.decision.decisionTree])
  const linkListState = useMemo(() => new LinkListState(props.decision.decisionTree), [props.decision.decisionTree])

  const previousHistory = previousHistoryBind({ history, nodeListState })
  const nextHistory = nextHistoryBind({ history, nodeListState })
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

  useEffect(subscribeHistory, [props.decision.decisionTree])

  return (
    <div className={c(props.className, Editor.displayName)}>
      <Header submit={submit} nodeList={nodeListState} editorController={controller} className='panel --header' />
      <Toolbar
        history={history}
        nextHistory={nextHistory}
        previousHistory={previousHistory}
        nodeListState={nodeListState}
        className='panel --toolbar'
        addNode={addNode}
        removeSelectedNodes={removeSelectedNodes}
      />
      <LeftPanel
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={centerNode}
        nodeListState={nodeListState}
      />
      <RightPanel
        className='panel --right'
        ruleList={props.ruleList}
        linkListState={linkListState}
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__right`, defaultSize: 300 }}
        nodeListState={nodeListState}
      />
      <Canvas removeNode={removeNode} state={canvasState} nodeListState={nodeListState} linkListState={linkListState} />
    </div>
  )

  // Private

  function submit(): void {
    props.onSubmit({ editorManager: controller, canvasState, nodeListState, linkListState })
  }

  function subscribeHistory(): void {
    historyListener({ history, controller: controller, nodeListState, linkListState })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName === 'path' || el.tagName === 'svg') {
      linkListState.editingId.set(undefined)
      nodeListState.selection.set([])
    }
  }
}
