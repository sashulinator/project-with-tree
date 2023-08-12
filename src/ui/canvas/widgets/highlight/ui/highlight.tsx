import { Position, c } from '~/utils/core'
import { Size } from '~/utils/dom/types/size'

Highlight.displayName = 'Highlight'

export interface Props {
  className?: string
  position: Position
  size: Size
}

export default function Highlight(props: Props): JSX.Element {
  return (
    <rect
      width={props.size.width}
      height={props.size.height}
      x={props.position.x}
      y={props.position.y}
      className={c(props.className, Highlight.displayName)}
    />
  )
}
