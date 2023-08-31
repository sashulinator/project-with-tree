import './editor.scss'

import { useMemo } from 'react'

import { RulesRes } from '~/entities/rules/types/rules-type'
import { Id, c } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'

import {
  Canvas,
  CanvasController,
  Controller,
  Decision,
  Header,
  LeftPanel,
  LinkListState,
  NodeListState,
  RightPanel,
  Toolbar,
} from '../'
import {
  HistoryController,
  addNode as addNodeBind,
  centerNode as centerNodeBind,
  copySelectedNodes as copySelectedNodesBind,
  cutSelectedNodes as cutSelectedNodesBind,
  paste as pasteBind,
  pasteFromClipboard as pasteFromClipboardBind,
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
    editorController: Controller
    canvasController: CanvasController
    nodeListState: NodeListState
    linkListState: LinkListState
  }) => void
}

export default function Editor(props: Props): JSX.Element {
  const controller = useMemo(() => new Controller(props.decision), [props.decision.decisionTree])
  const canvasController = useMemo(() => new CanvasController(), [props.decision.decisionTree])
  const nodeListState = useMemo(() => new NodeListState(props.decision.decisionTree), [props.decision.decisionTree])
  const linkListState = useMemo(() => new LinkListState(props.decision.decisionTree), [props.decision.decisionTree])

  const removeNode = removeNodeBind({ linkListState, nodeListState })
  const addNode = addNodeBind({ canvasController, nodeListState })
  const removeSelectedNodes = removeSelectedNodesBind({ nodeListState, removeNode })
  const centerNode = centerNodeBind({ nodeListState, canvasController })
  const copySelectedNodes = copySelectedNodesBind({ nodeListState })
  const cutSelectedNodes = cutSelectedNodesBind({ nodeListState })
  const pasteFromClipboard = pasteFromClipboardBind({ nodeListState, addNode })
  const paste = pasteBind({ nodeListState, canvasController, pasteFromClipboard })
  const resetAll = resetAllBind({ linkListState, nodeListState })

  const history = useMemo(
    () =>
      new HistoryController({
        nodeListState,
      }),
    [props.decision.decisionTree]
  )

  useKeyDownListener(
    {
      resetAll,
      removeSelectedNodes,
      copySelectedNodes,
      paste,
      cutSelectedNodes,
    },
    history
  )
  useEventListener('click', onClick)

  return (
    <div className={c(props.className, Editor.displayName)}>
      <Header submit={submit} nodeList={nodeListState} editorController={controller} className='panel --header' />
      <Toolbar
        history={history}
        nodeListState={nodeListState}
        className='panel --toolbar'
        addNode={addNode}
        removeSelectedNodes={removeSelectedNodes}
      />
      <LeftPanel
        selectNodes={selectNodes}
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={centerNode}
        nodeListState={nodeListState}
      />
      <RightPanel
        selectNodes={selectNodes}
        className='panel --right'
        ruleList={props.ruleList}
        linkListState={linkListState}
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__right`, defaultSize: 300 }}
        nodeListState={nodeListState}
      />
      <Canvas
        selectNodes={selectNodes}
        removeNode={removeNode}
        controller={canvasController}
        nodeListState={nodeListState}
        linkListState={linkListState}
      />
    </div>
  )

  // Private

  function selectNodes(value: Id[]): void {
    const previous = [...nodeListState.selection.value]
    nodeListState.selection.set(value)
    history.addSelection({ value, previous })
  }

  function submit(): void {
    props.onSubmit({ editorController: controller, canvasController, nodeListState, linkListState })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName === 'path' || el.tagName === 'svg') {
      linkListState.editingId.set(undefined)
      selectNodes([])
    }
  }
}
