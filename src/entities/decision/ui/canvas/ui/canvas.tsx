import AbstractChart, { ChartProps, Draggable, Zoomable } from '~/widgets/chart'

export default function Canvas(props: ChartProps): JSX.Element {
  return (
    <Zoomable setScale={props.state.setScale} scale={props.state.scale}>
      {(zoomProps): JSX.Element => (
        <Draggable translate={props.state.translate} setTranslate={props.state.setTranslate}>
          {(dragProps): JSX.Element => {
            return <AbstractChart {...props} {...dragProps} {...zoomProps} />
          }}
        </Draggable>
      )}
    </Zoomable>
  )
}
