import AbstractChart, { CanvasProps, Draggable, Zoomable } from '~/widgets/canvas'

export default function Canvas(props: CanvasProps): JSX.Element {
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
