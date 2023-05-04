import React, { useEffect, useMemo } from 'react'

import { Decision, Item, Node } from '~/entities/decision'
import ChartLink, { ChartLinkProps } from '~/ui/chart-link'
import Chart from '~/ui/chart/ui/chart'
import { assertDefined } from '~/utils/core'
import { useEventListener, useForceUpdate } from '~/utils/hooks'
import { State as ChartState, EventNames } from '~/widgets/chart'
import { State as ItemState } from '~/widgets/chart-item'

interface DecisionEditorProps {
  chartState: ChartState<Decision, ItemState<Item>>
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.itemStates)

  const update = useForceUpdate()

  useEffect(() => {
    props.chartState.mitt.on(EventNames.setItemStates, update)
  })

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'z') {
      if (e.shiftKey) {
        props.chartState.history.next()
      } else {
        props.chartState.history.prev()
      }
    }
  })

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
      {links?.map((link) => {
        return <ChartLink key={`${link.targetState.data.id}${link.sourceState.data.id}`} {...link} />
      })}
      {itemStates.map((state) => {
        return <Node key={state.data.id} state={state} treeState={props.chartState} />
      })}
    </Chart>
  )
}
