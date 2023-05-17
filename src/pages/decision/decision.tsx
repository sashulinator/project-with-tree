import './decision.css'

import { useMemo } from 'react'

import { Point, isLinkedNode } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'
import { Id } from '~/utils/core'
import { State as ChartState } from '~/widgets/chart'
import { State as ItemState } from '~/widgets/chart-item'

import Preview from './ui/decision-editor'
import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const itemStates = useMemo(() => {
    return decision.data.reduce<Record<Id, ItemState<Point>>>((acc, item) => {
      if (isLinkedNode(item)) return acc
      acc[item.id] = new ItemState(item, { position: item, id: item.id, links: item.links })
      return acc
    }, {})
  }, [decision.data])

  const chartState = new ChartState(decision, { translate: { x: 0, y: 0 }, scale: 1, itemStates })

  return (
    <main className='DecisionPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview chartState={chartState} />
      <PropsPanel chartState={chartState} />
    </main>
  )
}
