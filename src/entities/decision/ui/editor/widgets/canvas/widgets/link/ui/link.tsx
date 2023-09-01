import './link.css'

import { Link as UILink } from '~/ui/canvas'
import { Id, Position, c } from '~/utils/core'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'
import { toggle } from '~/utils/id-array'

import { Controller, ListController, getOffset } from '..'
import { NodeListController } from '../../../../..'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  state: Controller
  nodeList: NodeListController
  selectLinks: (ids: Id[]) => void
  // TODO не ничего не должен знать о Листе
  listState: ListController
}

export default function Link(props: LinkProps): JSX.Element | null {
  const { scale, canvasTranslate, listState, nodeList: nodeListController, ...pathProps } = props

  const sourceState = nodeListController.find(props.state.sourceId.value)
  const targetState = nodeListController.find(props.state.targetId.value)

  useUpdate(subscribeOnUpdates, [sourceState, targetState])
  useOnMount(useForceUpdate())

  const isCurrentEditing = listState.editingId.value === props.state.id

  if ((!sourceState || !targetState) && !isCurrentEditing) return null

  const isSelected = props.listState.selection.isSelected(props.state.id)

  return (
    <UILink
      {...pathProps}
      className={c(pathProps.className, 'rule-Link', isSelected && '--selected')}
      scale={scale}
      sourceOffset={getOffset(props.state.id, sourceState?.ref.value)}
      targetOffset={getOffset(props.state.id, targetState?.ref.value)}
      canvasTranslate={canvasTranslate}
      sourcePosition={sourceState?.position.value}
      targetPosition={targetState?.position.value}
      onClick={fns(pathProps.onClick, (e) => {
        if (isMetaCtrlKey(e)) {
          props.selectLinks(toggle(props.state.id, props.listState.selection.value))
        } else {
          props.selectLinks([props.state.id])
        }
      })}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(listState.on('editingId', () => setTimeout(update)))
    uns.push(listState.on('targetId', () => setTimeout(update)))
    uns.push(listState.on('sourceId', () => setTimeout(update)))
    uns.push(listState.on('index', () => setTimeout(update)))
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

Link.displayName = 'RuleLink'
