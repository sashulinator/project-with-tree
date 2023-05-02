import AbstractChart, { ChartProps, Draggable, Zoomable } from '~/packages/chart'

export default function Chart(props: ChartProps): JSX.Element {
  return (
    <Zoomable state={props.chartState}>
      {(zoomProps): JSX.Element => (
        <Draggable chartState={props.chartState}>
          {(dragProps): JSX.Element => {
            return <AbstractChart {...props} {...dragProps} {...zoomProps} />
          }}
        </Draggable>
      )}
    </Zoomable>
  )
}
