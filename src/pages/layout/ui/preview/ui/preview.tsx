import { LayoutState, ROOT_ID } from '~/entities/layout'
import Movable from '~/feature/movable/movable'
import { assertDefined } from '~/utils/core'

import Item from './item'

interface PreviewProps {
  layoutState: LayoutState
}

export default function Preview(props: PreviewProps): JSX.Element {
  const root = props.layoutState.items[ROOT_ID]
  assertDefined(root)

  return (
    <Movable>
      <div className='Preview'>
        <Item id={ROOT_ID} layoutState={props.layoutState} />
      </div>
    </Movable>
  )
}
