import React, { useMemo } from 'react'

import { Decision, Item } from '~/entities/decision'
import NodeUI from '~/entities/decision/ui/item/ui/item'
import { State as ChartState } from '~/packages/chart'
import { State as ItemState } from '~/packages/tree-chart-item'
import ChartLink, { ChartLinkProps } from '~/ui/chart-link'
import Chart from '~/ui/chart/ui/chart'
import { assertDefined } from '~/utils/core'

interface DecisionEditorProps {
  chartState: ChartState<Decision, ItemState<Item>>
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.itemStates)

  const links = useMemo(() => {
    return itemStates.reduce<ChartLinkProps<Item>[]>((acc, sourceState) => {
      const linksProps = sourceState.data.links?.map((link) => {
        const targetState = props.chartState.itemStates[link.id]
        assertDefined(targetState)
        const linkProps: ChartLinkProps<Item> = {
          targetState,
          sourceState,
          link,
        }
        return linkProps
      })
      if (linksProps) acc = [...acc, ...linksProps]
      return acc
    }, [])
  }, [itemStates.length])

  return (
    <Chart state={props.chartState}>
      {itemStates.map((state) => {
        return (
          <NodeUI key={state.data.id} state={state} treeState={props.chartState}>
            <rect width='200' height='100' fill='red' />
            <text>{state.data.id}</text>
          </NodeUI>
        )
      })}
      {links?.map((link) => {
        return <ChartLink key={`${link.targetState.data.id}${link.sourceState.data.id}`} {...link} />
      })}
    </Chart>
  )
}
