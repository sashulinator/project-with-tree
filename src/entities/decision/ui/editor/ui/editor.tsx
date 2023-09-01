import './editor.scss'

import { useMemo } from 'react'

import { RulesRes } from '~/entities/rules/types/rules-type'
import { Id, c } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'
import { Required } from '~/utils/types/object'

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
import { Point } from '../../..'
import {
  _HistoryController,
  _centerNode,
  _copy,
  _cut,
  _paste,
  _pasteFromClipboard,
  _useKeyDownListener,
} from '../_private'

Editor.displayName = 'decision-Editor'

const resizeBarClassName = 'resizeBar'

export interface Props {
  className?: string
  decision: Decision
  ruleList: RulesRes[]
  onSubmit: (states: {
    editor: Controller
    canvas: CanvasController
    nodeList: NodeListController
    linkList: LinkListController
  }) => void
}

export default function Editor(props: Props): JSX.Element {
  const controller = useMemo(() => new Controller(props.decision), [props.decision.decisionTree])
  const canvas = useMemo(() => new CanvasController(), [props.decision.decisionTree])
  const nodeList = useMemo(() => new NodeListController(props.decision.decisionTree), [props.decision.decisionTree])
  const linkList = useMemo(() => new LinkListController(props.decision.decisionTree), [props.decision.decisionTree])

  const history = useMemo(() => {
    const props = { nodeList, canvas, linkList }
    return new _HistoryController(props)
  }, [props.decision.decisionTree])

  _useKeyDownListener(
    {
      reset,
      removeSelected,
      copySelected,
      paste,
      cutSelected,
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
        removeSelectedNodes={removeSelected}
      />
      <LeftPanel
        selectNodes={selectNodes}
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={centerNode}
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

  function submit(): void {
    props.onSubmit({
      editor: controller,
      canvas: canvas,
      nodeList: nodeList,
      linkList: linkList,
    })
  }

  function onClick(e: MouseEvent): void {
    const el = e.target as HTMLElement
    if (el.tagName !== 'path' && el.tagName !== 'svg') return
    reset()
  }

  function selectNodes(ids: Id[]): void {
    history.selectNodes(ids)
  }

  function cutSelected(): void {
    _cut({ nodeList }, nodeList.selection.value)
  }

  function copySelected(): void {
    _copy({ nodeList }, nodeList.selection.value)
  }

  function removeSelected(): void {
    history.removeNodes(nodeList.selection.value)
  }

  function reset(): void {
    linkList.editingId.set(undefined)
    selectNodes([])
  }

  function paste(): void {
    _paste({ nodeList, canvas, pasteFromClipboard })
  }

  function addNode(point: Required<Partial<Point>, 'level'>): void {
    history.addNode(point)
  }

  function centerNode(id: Id): void {
    _centerNode({ nodeList, canvas }, id)
  }

  function pasteFromClipboard(): void {
    _pasteFromClipboard({ nodeList, addNode })
  }
}
