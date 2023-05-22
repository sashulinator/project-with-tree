import { useEffect, useMemo } from 'react'

import { DecisionState as ChartState, Decision, EventNames, Node, Point } from '~/entities/decision'
import Canvas from '~/entities/decision/ui/canvas/ui/canvas'
import { assertDefined } from '~/utils/core'
import { useEventListener, useForceUpdate } from '~/utils/hooks'
import { PointState } from '~/widgets/chart-item'
import ChartLink, { ChartLinkProps } from '~/widgets/chart-link'

interface DecisionEditorProps {
  chartState: ChartState<Decision, PointState>
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.pointStates)

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
        const targetState = props.chartState.pointStates[link.id]
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
    <Canvas state={props.chartState}>
      {links?.map((link) => {
        return <ChartLink key={`${link.targetState.point.id}${link.sourceState.point.id}`} {...link} />
      })}
      {itemStates.map((state) => {
        return <Node key={state.point.id} state={state} decisionState={props.chartState} />
      })}
    </Canvas>
  )
}
