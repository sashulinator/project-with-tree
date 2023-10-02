import './edge.scss'

import { Edge as UiEdge } from '~/ui/canvas'
import { c } from '~/utils/core'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

import { Controller as CanvasController } from '../../../models/controller'
import { ListController as NodeListController } from '../../node'
import { getOffset } from '../lib/get-offset'
import { Controller } from '../models/constroller'
import { Controller as ListController } from '../variants/list'

Edge.displayName = 'decision-Editor-w-Canvas-w-Edge'

export interface Props extends React.HTMLAttributes<SVGPathElement> {
  controller: Controller
  canvas: CanvasController
  nodeList: NodeListController
  list: ListController
  toggle: () => void
  select: () => void
}

export default function Edge(props: Props): JSX.Element | null {
  const { canvas, controller, list, nodeList, toggle, select, ...pathProps } = props

  const sourceNode = nodeList.find(controller.sourceId.value)
  const targetNode = nodeList.find(controller.targetId.value)

  useUpdate(subscribeOnUpdates, [sourceNode, targetNode])
  useOnMount(useForceUpdate())

  const isCurrentEditing = list.jointEditingId.value === controller.id

  if ((!sourceNode || !targetNode) && !isCurrentEditing) return null

  const isSelected = list.selection.isSelected(controller.id)

  const sourceOffset = sourceNode
    ? getOffset(props.controller.id, sourceNode?.ref.value, canvas.zoom.value.k, 23)
    : null
  const targetOffset = targetNode
    ? getOffset(props.controller.id, targetNode?.ref.value, canvas.zoom.value.k, -23)
    : null

  const sourcePosition = sourceNode?.position.value ?? canvas.mousePosition.value
  const targetPosition = targetNode?.position.value ?? canvas.mousePosition.value

  return (
    <g className={c(Edge.displayName)}>
      <UiEdge
        {...pathProps}
        className={c(pathProps.className, '--link', isSelected && '--selected')}
        strokeWidth={4}
        sourceOffset={sourceOffset}
        targetOffset={targetOffset}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
      {sourceNode && targetNode && (
        <UiEdge
          {...pathProps}
          className={c(pathProps.className, '--overlay', isSelected && '--selected')}
          sourceOffset={sourceOffset}
          targetOffset={targetOffset}
          strokeWidth={25}
          sourcePosition={sourcePosition}
          targetPosition={targetPosition}
          onClick={fns(pathProps.onClick, (e) => (isMetaCtrlKey(e) ? toggle() : select()))}
        />
      )}
    </g>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(list.on('jointEditingId', () => setTimeout(update)))
    uns.push(list.on('targetId', () => setTimeout(update)))
    uns.push(list.on('sourceId', () => setTimeout(update)))
    uns.push(list.on('index', () => setTimeout(update)))
    uns.push(list.on('selection', () => update))
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
