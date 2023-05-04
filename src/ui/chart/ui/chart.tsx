import AbstractChart, { ChartProps, Draggable, Zoomable } from '~/widgets/chart'

export default function Chart(props: ChartProps): JSX.Element {
  return (
    <Zoomable state={props.state}>
      {(zoomProps): JSX.Element => (
        <Draggable chartState={props.state}>
          {(dragProps): JSX.Element => {
            return <AbstractChart {...props} {...dragProps} {...zoomProps} />
          }}
        </Draggable>
      )}
    </Zoomable>
  )
}
