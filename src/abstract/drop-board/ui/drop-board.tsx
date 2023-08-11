import { c } from '~/utils/core'
import { preventDefault, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

DropBoard.displayName = 'a-DropBoard'

export interface DropBoardProps {
  drop: (e: React.DragEvent<HTMLDivElement>) => void
  children: React.ReactNode
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

function DropBoard(props: DropBoardProps): JSX.Element {
  const { drop, children } = props

  return (
    <div
      onDragOver={fns<[e: React.DragEvent<HTMLDivElement>]>(preventDefault, stopPropagation)}
      onDrop={drop}
      className={c(DropBoard.displayName, props.rootProps?.className)}
      {...props.rootProps}
    >
      {children}
    </div>
  )
}

export default DropBoard
