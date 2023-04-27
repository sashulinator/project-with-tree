import { layout1 } from '~/entities/decision/mock/decision'
import { layoutWithLinked } from '~/entities/decision/mock/decision-with-linked'
import { State } from '~/packages/chart'
import TreeChart from '~/packages/tree-chart'
import { assertNotNull } from '~/utils/core'
import { toDictionary } from '~/utils/list'

// import NodeFactory from './node-factory'

interface PreviewProps {
  state: State
}

export default function Preview(props: PreviewProps): JSX.Element | null {
  return null
  // const data = toDictionary((n) => n.id, layoutWithLinked.data)
  // assertNotNull(data)
  // return (
  //   <TreeChart
  //     data={data}
  //     nodeProps={{
  //       layouts: {
  //         [layoutWithLinked.id]: layoutWithLinked,
  //         [layout1.id]: layout1,
  //       },
  //     }}
  //     state={props.state}
  //     renderNode={}
  //   />
  // )
}
