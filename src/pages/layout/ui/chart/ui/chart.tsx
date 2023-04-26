import { State } from '~/widgets/chart'
import TreeChart from '~/widgets/tree-chart'

interface PreviewProps {
  state: State
}

export default function Preview(props: PreviewProps): JSX.Element {
  return <TreeChart state={props.state} />
}
