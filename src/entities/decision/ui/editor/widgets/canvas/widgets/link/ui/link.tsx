import './link.scss'

import { Link as UILink } from '~/ui/canvas'
import { Id, Position, c } from '~/utils/core'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

import { Controller, ListController, getOffset } from '..'
import { NodeListController } from '../../../../..'

Link.displayName = 'decision-Editor-w-Canvas-w-Link'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  state: Controller
  nodeList: NodeListController
  toggle: () => void
  selectLinks: (ids: Id[]) => void
  // TODO не ничего не должен знать о Листе
  listState: ListController
}

export default function Link(props: LinkProps): JSX.Element | null {
  const { scale, state, canvasTranslate, listState, nodeList, toggle, selectLinks, ...pathProps } = props

  const sourceState = nodeList.find(state.sourceId.value)
  const targetState = nodeList.find(state.targetId.value)

  useUpdate(subscribeOnUpdates, [sourceState, targetState])
  useOnMount(useForceUpdate())

  const isCurrentEditing = listState.editingId.value === state.id

  if ((!sourceState || !targetState) && !isCurrentEditing) return null

  const isSelected = listState.selection.isSelected(state.id)

  return (
    <g className={c(Link.displayName)}>
      <UILink
        {...pathProps}
        className={c(pathProps.className, '--link', isSelected && '--selected')}
        scale={scale}
        sourceOffset={getOffset(props.state.id, sourceState?.ref.value)}
        targetOffset={getOffset(props.state.id, targetState?.ref.value)}
        canvasTranslate={canvasTranslate}
        strokeWidth={2}
        sourcePosition={sourceState?.position.value}
        targetPosition={targetState?.position.value}
        onClick={fns(pathProps.onClick, (e) => (isMetaCtrlKey(e) ? toggle() : selectLinks([props.state.id])))}
      />
      <UILink
        {...pathProps}
        className={c(pathProps.className, '--overlay', isSelected && '--selected')}
        scale={scale}
        sourceOffset={getOffset(props.state.id, sourceState?.ref.value)}
        targetOffset={getOffset(props.state.id, targetState?.ref.value)}
        canvasTranslate={canvasTranslate}
        strokeWidth={25}
        sourcePosition={sourceState?.position.value}
        targetPosition={targetState?.position.value}
        onClick={fns(pathProps.onClick, (e) => (isMetaCtrlKey(e) ? toggle() : selectLinks([props.state.id])))}
      />
    </g>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(listState.on('editingId', () => setTimeout(update)))
    uns.push(listState.on('targetId', () => setTimeout(update)))
    uns.push(listState.on('sourceId', () => setTimeout(update)))
    uns.push(listState.on('index', () => setTimeout(update)))
    uns.push(listState.on('selection', () => update))
    if (targetState) {
      uns.push(targetState?.on('position', update))
      uns.push(targetState?.on('ref', update))
    }
    if (sourceState) {
      uns.push(sourceState?.on('position', update))
      uns.push(sourceState?.on('ref', update))
    }
  }
}
