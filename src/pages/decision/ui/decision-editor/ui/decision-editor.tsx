import React, { useEffect, useMemo } from 'react'

import { Decision, Node, Point } from '~/entities/decision'
import Chart from '~/ui/chart/ui/chart'
import { assertDefined } from '~/utils/core'
import { useEventListener, useForceUpdate } from '~/utils/hooks'
import { State as ChartState, EventNames } from '~/widgets/chart'
import { State as ItemState } from '~/widgets/chart-item'
import ChartLink, { ChartLinkProps } from '~/widgets/chart-link'

interface DecisionEditorProps {
  chartState: ChartState<Decision, ItemState<Point>>
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.itemStates)

  const update = useForceUpdate()

  useEffect(() => {
    props.chartState.emitter.on(EventNames.setItemStates, update)
    props.chartState.emitter.on(EventNames.setItemStates, update)
  })

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'z') {
      if (e.shiftKey) {
        props.chartState.history.next()
      } else {
        props.chartState.history.previous()
      }
    }
  })

  const links = useMemo(() => {
    return itemStates.reduce<ChartLinkProps<Point>[]>((acc, sourceState) => {
      const linksProps = sourceState.links?.map((link) => {
        const targetState = props.chartState.itemStates[link.id]
        assertDefined(targetState)
        const linkProps: ChartLinkProps<Point> = {
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
        return <Node key={state.data.id} state={state} decisionState={props.chartState} />
      })}
    </Chart>
  )
}
