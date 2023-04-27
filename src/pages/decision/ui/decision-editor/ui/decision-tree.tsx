import { isLinkedNode } from '~/entities/decision'
import { decisions } from '~/entities/decision/mock'
import { decisionWithLinked } from '~/entities/decision/mock/decision-with-linked'
import { State } from '~/packages/chart'
import Chart from '~/ui/chart'
import { toDictionary } from '~/utils/list'

import Factory from './factory'
import LinkedNodeUI from './linked-node'
import NodeUI from './node'

// import NodeFactory from './node-factory'

interface DecisionTreeProps {
  state: State
}

export default function DecisionTree(props: DecisionTreeProps): JSX.Element | null {
  const data = toDictionary((node) => node.id, decisionWithLinked.data)

  if (data === null) {
    return null
  }

  return (
    <Chart state={props.state}>
      <Factory state={props.state} data={data} decisions={decisions} />
    </Chart>
  )
}
