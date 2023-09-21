import './link.scss'

import { Link as UILink } from '~/ui/canvas'
import { Id, c } from '~/utils/core'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

import { Controller, ListController, getOffset } from '..'
import { CanvasController, NodeListController } from '../../../../..'

Link.displayName = 'decision-Editor-w-Canvas-w-Link'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  state: Controller
  canvas: CanvasController
  nodeList: NodeListController
  toggle: () => void
  selectLinks: (ids: Id[]) => void
  listState: ListController
}

export default function Link(props: LinkProps): JSX.Element | null {
  const { scale, canvas, state, listState, nodeList, toggle, selectLinks, ...pathProps } = props

  const sourceNode = nodeList.find(state.sourceId.value)
  const targetNode = nodeList.find(state.targetId.value)

  useUpdate(subscribeOnUpdates, [sourceNode, targetNode])
  useOnMount(useForceUpdate())

  const isCurrentEditing = listState.jointEditingId.value === state.id

  if ((!sourceNode || !targetNode) && !isCurrentEditing) return null

  const isSelected = listState.selection.isSelected(state.id)

  const sourceOffset = sourceNode ? getOffset(props.state.id, sourceNode?.ref.value, scale, 23) : null
  const targetOffset = targetNode ? getOffset(props.state.id, targetNode?.ref.value, scale, -23) : null

  const sourcePosition = sourceNode?.position.value ?? canvas.mousePosition.value
  const targetPosition = targetNode?.position.value ?? canvas.mousePosition.value

  return (
    <g className={c(Link.displayName)}>
      <UILink
        {...pathProps}
        className={c(pathProps.className, '--link', isSelected && '--selected')}
        strokeWidth={4}
        sourceOffset={sourceOffset}
        targetOffset={targetOffset}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
      {sourceNode && targetNode && (
        <UILink
          {...pathProps}
          className={c(pathProps.className, '--overlay', isSelected && '--selected')}
          sourceOffset={sourceOffset}
          targetOffset={targetOffset}
          strokeWidth={25}
          sourcePosition={sourcePosition}
          targetPosition={targetPosition}
          onClick={fns(pathProps.onClick, (e) => (isMetaCtrlKey(e) ? toggle() : selectLinks([props.state.id])))}
        />
      )}
    </g>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(listState.on('jointEditingId', () => setTimeout(update)))
    uns.push(listState.on('targetId', () => setTimeout(update)))
    uns.push(listState.on('sourceId', () => setTimeout(update)))
    uns.push(listState.on('index', () => setTimeout(update)))
    uns.push(listState.on('selection', () => update))
    if (targetNode) {
      uns.push(targetNode?.on('position', update))
      uns.push(targetNode?.on('ref', update))
    }
    if (sourceNode) {
      uns.push(sourceNode?.on('position', update))
      uns.push(sourceNode?.on('ref', update))
    }
    if (!sourceNode || !targetNode) {
      uns.push(props.canvas?.on('mousePosition', update))
    }
  }
}
