import './editor.scss'

import { useMemo } from 'react'

import { RulesRes } from '~/entities/rules/types/rules-type'
import { Id, c, curry } from '~/utils/core'
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
  centerNode,
  copySelectedNodes as copySelectedNodesBind,
  cutSelectedNodes as cutSelectedNodesBind,
  paste as pasteBind,
  pasteFromClipboard as pasteFromClipboardBind,
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
  const canvas = useMemo(() => new CanvasController(), [props.decision.decisionTree])
  const nodeList = useMemo(() => new NodeListController(props.decision.decisionTree), [props.decision.decisionTree])
  const linkList = useMemo(() => new LinkListController(props.decision.decisionTree), [props.decision.decisionTree])

  const history = useMemo(() => {
    const props = { nodeList, canvas, linkList }
    return new HistoryController(props)
  }, [props.decision.decisionTree])

  const curriedCenterNode = curry(centerNode)({ nodeList, canvas })
  const copySelectedNodes = copySelectedNodesBind({ nodeListController: nodeList })
  const cutSelectedNodes = cutSelectedNodesBind({ nodeListController: nodeList })
  const pasteFromClipboard = pasteFromClipboardBind({ nodeListController: nodeList, addNode: history.addNode })
  const paste = pasteBind({ nodeListController: nodeList, canvasController: canvas, pasteFromClipboard })

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
      <Header submit={submit} nodeList={nodeList} editorController={controller} className='panel --header' />
      <Toolbar
        history={history}
        nodeListController={nodeList}
        className='panel --toolbar'
        addNode={history.addNode}
        removeSelectedNodes={removeSelectedNodes}
      />
      <LeftPanel
        selectNodes={selectNodes}
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={curriedCenterNode}
        nodeListController={nodeList}
      />
      <RightPanel
        selectNodes={selectNodes}
        className='panel --right'
        ruleList={props.ruleList}
        linkListController={linkList}
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__right`, defaultSize: 300 }}
        nodeListController={nodeList}
      />
      <Canvas
        history={history}
        selectNodes={selectNodes}
        controller={canvas}
        nodeListController={nodeList}
        linkListController={linkList}
      />
    </div>
  )

  // Private

  /**
   * Nodes
   */
  function removeSelectedNodes(): void {
    history.removeNodes(nodeList.selection.value)
  }

  function selectNodes(ids: Id[]): void {
    history.selectNodes(ids)
  }

  /**
   * Other
   */
  function resetAll(): void {
    linkList.editingId.set(undefined)
    selectNodes([])
  }

  function submit(): void {
    props.onSubmit({
      editorController: controller,
      canvasController: canvas,
      nodeListController: nodeList,
      linkListController: linkList,
    })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName !== 'path' && el.tagName !== 'svg') return
    resetAll()
  }
}
