import './line.css'

import { c } from '~/utils/core'

Line.displayName = 'ui-Line'

export interface Props {
  className?: string
}

export default function Line(props: Props): JSX.Element {
  return <hr className={c(props.className, Line.displayName)} />
}
