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
  LinkListController,
  NodeListController,
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
    nodeListController: NodeListController
    linkListController: LinkListController
  }) => void
}

export default function Editor(props: Props): JSX.Element {
  const controller = useMemo(() => new Controller(props.decision), [props.decision.decisionTree])
  const canvasController = useMemo(() => new CanvasController(), [props.decision.decisionTree])
  const nodeListController = useMemo(
    () => new NodeListController(props.decision.decisionTree),
    [props.decision.decisionTree]
  )
  const linkListController = useMemo(
    () => new LinkListController(props.decision.decisionTree),
    [props.decision.decisionTree]
  )

  const removeNode = removeNodeBind({ linkListController, nodeListController })
  const addNode = addNodeBind({ canvasController, nodeListController })
  const removeSelectedNodes = removeSelectedNodesBind({ nodeListController, removeNode })
  const centerNode = centerNodeBind({ nodeListController, canvasController })
  const copySelectedNodes = copySelectedNodesBind({ nodeListController })
  const cutSelectedNodes = cutSelectedNodesBind({ nodeListController })
  const pasteFromClipboard = pasteFromClipboardBind({ nodeListController, addNode })
  const paste = pasteBind({ nodeListController, canvasController, pasteFromClipboard })
  const resetAll = resetAllBind({ linkListController, nodeListController })

  const history = useMemo(
    () =>
      new HistoryController({
        nodeListController,
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
      <Header submit={submit} nodeList={nodeListController} editorController={controller} className='panel --header' />
      <Toolbar
        history={history}
        nodeListController={nodeListController}
        className='panel --toolbar'
        addNode={addNode}
        removeSelectedNodes={removeSelectedNodes}
      />
      <LeftPanel
        selectNodes={selectNodes}
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={centerNode}
        nodeListController={nodeListController}
      />
      <RightPanel
        selectNodes={selectNodes}
        className='panel --right'
        ruleList={props.ruleList}
        linkListController={linkListController}
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__right`, defaultSize: 300 }}
        nodeListController={nodeListController}
      />
      <Canvas
        selectNodes={selectNodes}
        removeNode={removeNode}
        controller={canvasController}
        nodeListController={nodeListController}
        linkListController={linkListController}
      />
    </div>
  )

  // Private

  function selectNodes(value: Id[]): void {
    const previous = [...nodeListController.selection.value]
    nodeListController.selection.set(value)
    history.addSelection({ value, previous })
  }

  function submit(): void {
    props.onSubmit({ editorController: controller, canvasController, nodeListController, linkListController })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName === 'path' || el.tagName === 'svg') {
      linkListController.editingId.set(undefined)
      selectNodes([])
    }
  }
}
