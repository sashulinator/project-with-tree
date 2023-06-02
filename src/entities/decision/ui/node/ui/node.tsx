import clsx from 'clsx'
import { useState } from 'react'

import { CanvasState } from '~/entities/decision'
import { PointState } from '~/entities/point/state'
import { Node as UINode } from '~/ui/canvas'
import { useOnMount, useUpdate } from '~/utils/hooks'
import { IsDragEvent } from '~/widgets/canvas'

export interface ItemNodeProps {
  state: PointState
  decisionState: CanvasState
  children: React.ReactNode
  isDrag?: (event: IsDragEvent) => boolean
}

export default function Node(props: ItemNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)
  useOnMount(subscribeOnSelected)

  const [isSelected, select] = useState(false)

  return (
    <UINode
      className={clsx('point-Node', isSelected && '--selected')}
      nodeTitle={props.state.point.name}
      width={props.state.width.value}
      height={props.state.height.value}
      position={props.state.position.value}
      lastPosition={props.state.position.last}
      scale={props.decisionState.scale.value}
      onMouseDown={selectOnMouseAction}
      onMove={props.state.position.move}
      onClick={selectOnMouseAction}
    >
      {props.children}
    </UINode>
  )

  // Private

  function subscribeOnSelected(): () => void {
    const unsubscribe = props.decisionState.emitter.on('setSelected', ({ value }) =>
      select(value?.includes(props.state.id))
    )
    return unsubscribe
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.emitter.on('setPosition', update))
    uns.push(props.state.emitter.on('setWidth', update))
    uns.push(props.state.emitter.on('setHeight', update))
  }

  function selectOnMouseAction(e: React.MouseEvent<SVGGElement>): void {
    if (e.metaKey) {
      props.decisionState.selected.toggle(props.state.id)
    } else {
      // Исключаем попадание в историю избыточное выделение
      if (props.decisionState.selected.isSelected(props.state.id)) return
      props.decisionState.selected.add(props.state.id)
    }
  }
}
