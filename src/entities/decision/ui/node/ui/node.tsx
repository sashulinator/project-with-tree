import { FullGestureState } from '@use-gesture/react'

import { CanvasState } from '~/entities/decision'
import { PointNode } from '~/entities/point'
import { PointState } from '~/entities/point/state'
import CanvasItem from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'
import { IsDragEvent } from '~/widgets/canvas'
import CanvasItemSelectable from '~/widgets/canvas/ui/item/features/selectable'

export interface ItemNodeProps {
  state: PointState
  decisionState: CanvasState
  linksContainer: SVGGElement
}

export default function Node(props: ItemNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <CanvasItemSelectable id={props.state.id} chartState={props.decisionState}>
      {(selectableProps): JSX.Element => {
        return (
          <CanvasItem
            width={props.state.width.value}
            height={props.state.height.value}
            position={props.state.position.value}
            lastPosition={props.state.position.last}
            scale={props.decisionState.scale.value}
            onMouseDown={(e): void => selectableProps.selectOnMouseAction(e)}
            onMove={props.state.position.move}
            isDrag={isDrag}
          >
            {
              <Factory
                linksContainer={props.linksContainer}
                state={props.state}
                decisionState={props.decisionState}
                isSelected={selectableProps.isSelected}
              />
            }
          </CanvasItem>
        )
      }}
    </CanvasItemSelectable>
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.state.emitter.on('setPosition', update)
    props.state.emitter.on('setWidth', update)
    props.state.emitter.on('setHeight', update)
  }

  function isDrag(event: IsDragEvent): boolean {
    const target = event.event.target as HTMLElement
    return target.classList.contains('name')
  }
}

interface FactoryProps {
  state: PointState
  decisionState: CanvasState
  linksContainer: SVGGElement
  isSelected: boolean
}

function Factory(props: FactoryProps): JSX.Element {
  const { type } = props.state.point

  if (type === 'MAIN') {
    return <PointNode {...props} />
  }

  return (
    <>
      <rect
        width={props.state.width.value}
        height={props.state.height.value}
        fill={'yellow'}
        stroke='black'
        strokeWidth={props.isSelected ? '1px' : 0}
      />
      <text x={20} y={props.state.height.value - 30}>
        {props.state.point.id}
      </text>
    </>
  )
}
