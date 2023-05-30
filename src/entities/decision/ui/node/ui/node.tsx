import { CanvasState } from '~/entities/decision'
import { PointNode } from '~/entities/point'
import { PointState } from '~/entities/point/state'
import ChartItem from '~/ui/chart-item'
import { useUpdate } from '~/utils/hooks'
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
          <ChartItem
            isDrag={(event): boolean => {
              const target = event.event.target as HTMLElement
              return target.classList.contains('name')
            }}
            onMouseDown={(e): void => selectableProps.selectOnMouseAction(e)}
            state={props.state}
            chartState={props.decisionState}
          >
            {
              <Factory
                linksContainer={props.linksContainer}
                state={props.state}
                decisionState={props.decisionState}
                isSelected={selectableProps.isSelected}
              />
            }
          </ChartItem>
        )
      }}
    </CanvasItemSelectable>
  )

  function subscribeOnUpdates(update: () => void): void {
    props.state.emitter.on('setPosition', update)
    props.state.emitter.on('setWidth', update)
    props.state.emitter.on('setHeight', update)
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
