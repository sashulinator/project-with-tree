import './decision.css'

import { useMemo } from 'react'

import { Item, isLinkedNode } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'
import { State as ChartState } from '~/packages/chart'
import { State as ItemState } from '~/packages/tree-chart-item'
import { Id } from '~/utils/core'

import Preview from './ui/decision-editor'
import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const itemStates = useMemo(() => {
    return decision.data.reduce<Record<Id, ItemState<Item>>>((acc, item) => {
      if (isLinkedNode(item)) return acc
      acc[item.id] = new ItemState(item, { position: item })
      return acc
    }, {})
  }, [decision.data])

  const chartState = new ChartState(decision, { translate: { x: 0, y: 0 }, scale: 0, itemStates })

  return (
    <main className='DecisionPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview chartState={chartState} />
      {/* <PropsPanel chartState={chartState} /> */}
    </main>
  )
}
