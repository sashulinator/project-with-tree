import { c } from '~/utils/core'

ArbitrationProps.displayName = 'decision-Editor-RightPanel-ArbitrationProps'

export interface Props {
  className?: string
}

export default function ArbitrationProps(props: Props): JSX.Element {
  return <div className={c(props.className, ArbitrationProps.displayName)}>ArbitrationProps</div>
}
