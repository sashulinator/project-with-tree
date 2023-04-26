import { State } from '~/widgets/chart'
import TreeChart from '~/widgets/tree-chart'

import Node from './node'

interface PreviewProps {
  state: State
}

const data = [
  {
    id: 'id1',
    name: 'Vasya',
    children: ['id2', 'id3'],
  },
  {
    id: 'id2',
    name: 'Petya',
  },
  {
    id: 'id3',
    name: 'Olya',
  },
]

export default function Preview(props: PreviewProps): JSX.Element {
  return <TreeChart data={data} state={props.state} renderNode={Node} />
}
