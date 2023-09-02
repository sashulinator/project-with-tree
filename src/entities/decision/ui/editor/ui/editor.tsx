import './editor.scss'

import { useMemo } from 'react'

import { RulesRes } from '~/entities/rules/types/rules-type'
import { Id, c } from '~/utils/core'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { useEventListener } from '~/utils/hooks'
import { toggle } from '~/utils/id-array'
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

  _useKeyDownListener({
    undo,
    redo,
    reset,
    removeSelected,
    copySelected,
    paste,
    cutSelected,
  })
  useEventListener('click', onClick)

  return (
    <div className={c(props.className, Editor.displayName)}>
      <Header submit={submit} nodeList={nodeList} editor={controller} className='panel --header' />
      <Toolbar
        className='panel --toolbar'
        nodeList={nodeList}
        addNode={addNode}
        removeSelectedNodes={removeSelected}
        undo={undo}
        redo={redo}
      />
      <LeftPanel
        selectNodes={selectNodes}
        className='panel --left'
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__left`, defaultSize: 300 }}
        centerNode={centerNode}
        nodeList={nodeList}
      />
      <RightPanel
        selectNodes={selectNodes}
        className='panel --right'
        ruleList={props.ruleList}
        linkList={linkList}
        resizableProps={{ className: resizeBarClassName, name: `${Editor.displayName}-panel__right`, defaultSize: 300 }}
        nodeList={nodeList}
      />
      <Canvas
        toggleNode={toggleNode}
        toggleLink={toggleLink}
        selectLinks={selectLinks}
        transitionMoveNodes={transitionMoveNodes}
        selectNodes={selectNodes}
        controller={canvas}
        nodeList={nodeList}
        linkList={linkList}
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
    if (el.tagName !== 'svg' || isMetaCtrlKey(e)) return
    reset()
  }

  function undo(): void {
    history.undo()
  }

  function redo(): void {
    history.redo()
  }

  function transitionMoveNodes(ids: Id[]): void {
    history.move(ids)
  }

  function selectNodes(ids: Id[]): void {
    history.select(ids, [])
  }

  function toggleNode(id: Id): void {
    history.select(toggle(id, nodeList.selection.value), linkList.selection.value)
  }

  function toggleLink(id: Id): void {
    history.select(nodeList.selection.value, toggle(id, linkList.selection.value))
  }

  function selectLinks(ids: Id[]): void {
    history.select([], ids)
  }

  function cutSelected(): void {
    _cut({ nodeList }, nodeList.selection.value)
  }

  function copySelected(): void {
    _copy({ nodeList }, nodeList.selection.value)
  }

  function removeSelected(): void {
    history.remove(nodeList.selection.value, linkList.selection.value)
  }

  function reset(): void {
    linkList.editingId.set(undefined)
    selectNodes([])
  }

  function paste(): void {
    _paste({ nodeList, canvas, pasteFromClipboard })
  }

  function addNode(point: Required<Partial<Point>, 'level'>): void {
    history.create(point)
  }

  function centerNode(id: Id): void {
    _centerNode({ nodeList, canvas }, id)
  }

  function pasteFromClipboard(): void {
    _pasteFromClipboard({ nodeList, addNode })
  }
}
