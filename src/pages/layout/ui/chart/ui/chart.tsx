import { State } from '~/packages/chart'
import TreeChart from '~/packages/tree-chart'
import { assertNotNull } from '~/utils/core'
import { toDictionary } from '~/utils/list'

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

export default function Preview(props: PreviewProps): JSX.Element | null {
  const dataDictionary = toDictionary((item) => item.id, data)

  return dataDictionary && <TreeChart data={dataDictionary} state={props.state} renderNode={Node} />
}
